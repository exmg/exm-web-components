import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';

import '@material/web/checkbox/checkbox.js';
import '@material/web/menu/menu.js';
import { Menu } from '@material/web/menu/menu.js';
import '@material/web/menu/menu-item.js';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';

import '@exmg/exm-grid/exm-grid.js';
import '@exmg/exm-grid/exm-grid-pagination.js';
import '@exmg/exm-grid/exm-grid-smart-toolbar.js';
import { gridStyles } from '@exmg/exm-grid';
import { style as demoStyles } from './demo-common-css.js';

import { createIcon } from './exm-icons.js';
import { DEFAULT_SORT_COLUMN, DEFAULT_SORT_DIRECTION, ExmBaseGridDemo } from './exm-grid-base.js';

@customElement('demo-complex-grid')
export class ExmComplexGrid extends ExmBaseGridDemo {
  // language=CSS
  static styles = [
    gridStyles,
    demoStyles,
    css`
      .expandable-toggle {
        cursor: pointer;
      }
      tr {
        position: relative;
      }
    `,
  ];

  constructor() {
    super();
    // this.selectedRowIds = this.items
    //   .slice(0, 3)
    //   .map(({ id }) => id.toString())
    //   .reduce((acc, item: string) => ({ ...acc, [item]: true }), {});
    // this.expandedRowIds = this.items
    //   .slice(3, 5)
    //   .map(({ id }) => id.toString())
    //   .reduce((acc, item: string) => ({ ...acc, [item]: true }), {});
  }

  // get more menu items for row
  moreMenu(id: string) {
    return html`
      <span style="position: relative">
        <md-icon-button
          id="moreBtn-${id}"
          @click=${(e) => ((e.target.parentNode.querySelector('md-menu') as Menu).open = true)}
          ><md-icon>more_vert</md-icon></md-icon-button
        >
        <md-menu id="more-menu-${id}" menu-corner="start-end" anchor="moreBtn-${id}">
          <md-menu-item>
            <div slot="headline">Apple</div>
          </md-menu-item>
          <md-menu-item>
            <div slot="headline">Banana</div>
          </md-menu-item>
          <md-menu-item>
            <div slot="headline">Cucumber</div>
          </md-menu-item>
        </md-menu>
      </span>
    `;
  }

  private renderTableBody() {
    return repeat(
      this.items,
      ({ id }) => id,
      (i) => {
        return html`
          <tr data-row-key="${i.id}">
            <td class="grid-checkbox-cell"><md-checkbox class="selectable-checkbox"></md-checkbox></td>
            <td>#${i.id}</td>
            <td>${i.month}</td>
            <td class="grid-col-number">${i.year}</td>
            <td class="grid-col-number">${i.amount}</td>
            <td class="grid-cell-visible-on-hover"><span class="expandable-toggle">${createIcon}</span></td>
            <td class="grid-col no-ellipsis menu-cell">${this.moreMenu(`${i.id}`)}</td>
          </tr>
          <tr class="grid-row-detail" data-row-detail-key="${i.id}">
            <td data-auto-colspan>
              <p>Here is expanded content for row id <b>${i.id}</b></p>
              <button class="demo-button" @click="${() => this.collapseRow(i.id.toString())}">Done</button>
            </td>
          </tr>
        `;
      },
    );
  }

  protected render() {
    return html`
      <exm-grid
        .items="${this.items}"
        .hiddenColumnNames="${this.hiddenColumns}"
        .expandedRowIds="${this.expandedRowIds}"
        .selectedRowIds="${this.selectedRowIds}"
        selectable-checkbox-selector=".selectable-checkbox"
        rows-selectable
        disable-row-click-selection
        expandable-toggle-selector=".expandable-toggle"
        @exm-grid-selected-rows-change="${this.onSelectedRowsChange}"
        default-sort-column="${DEFAULT_SORT_COLUMN}"
        default-sort-direction="${DEFAULT_SORT_DIRECTION}"
        ?sortable="${true}"
        @exm-grid-sort-change="${this.onSortChange}"
        table-layout="fixed"
      >
        <exm-grid-smart-toolbar
          slot="toolbar"
          amount-of-selected-items="${this.selectedRows.length}"
          .actions="${this.actions}"
          description="Income table"
          .filters="${this.filters}"
          ?show-column-filter="${true}"
          .columnFilterColumns="${this.columns}"
          @exm-grid-toolbar-action-executed="${this.onActionExecuted}"
          @exm-grid-toolbar-filter-changed="${this.onFilterChanged}"
          @exm-grid-toolbar-setting-changed="${this.onSettingChanged}"
        ></exm-grid-smart-toolbar>
        <table>
          <thead>
            <tr class="grid-columns">
              <th class="grid-checkbox-cell"><md-checkbox class="selectable-checkbox"></md-checkbox></th>
              <th><span>ID</span></th>
              <th style="width: 60%" data-column-key="month" data-sort>
                <span>Month</span>
              </th>
              <th class="grid-col-number" data-column-key="year" data-sort>
                <span>Year</span>
              </th>
              <th class="grid-col-number" data-column-key="amount" data-sort=""><span>Income</span></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody class="grid-data">
            ${this.renderTableBody()}
          </tbody>
        </table>
        <exm-grid-pagination
          slot="pagination"
          page-index=${this.pageIndex}
          page-size=${this.pageSize}
          .pageSizeOptions="${[10, 20, 30, 50, 100]}"
          item-count="${this.getTotalCount()}"
          @exm-grid-pagination-page-changed="${this.onPageChange}"
          @exm-grid-pagination-page-size-changed="${this.onPageSizeChange}"
        >
        </exm-grid-pagination>
      </exm-grid>
    `;
  }
}
