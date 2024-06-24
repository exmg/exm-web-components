import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import '@material/web/checkbox/checkbox.js';
import '@material/web/icon/icon.js';
import '@exm/exm-grid/src/table/exm-grid.js';
import '@exm/exm-grid/src/table/exm-grid-pagination.js';
import '@exm/exm-grid/src/table/exm-grid-smart-toolbar.js';
import { ExmgBaseGridDemo } from './exm-grid-base.js';

import { style as tableStyles } from '@exm/exm-grid/src/styles/exm-grid-styles-css.js';
import { style as demoStyles } from './demo-common-css.js';

@customElement('demo-complex-grid-sortable')
export class ExmgComplexGridWithSortableRows extends ExmgBaseGridDemo {
  static styles = [
    tableStyles,
    demoStyles,
    // language=CSS
    css`
      table th {
        min-width: 100px;
      }
      .expandable-toggle {
        cursor: pointer;
      }
    `,
  ];

  constructor() {
    super();
  }

  private renderTableBody() {
    return repeat(
      this.items,
      ({ id }) => id,
      (i) => {
        return html`
          <tr data-row-key="${i.id}">
            <td class="grid-checkbox-cell"><md-checkbox class="selectable-checkbox"></md-checkbox></td>
            <td>
              <span class="grid-row-drag-handler"><md-icon style="pointer-events: none;">drag_handle</md-icon></span>
            </td>
            <td>#${i.id}</td>
            <td>${i.month}</td>
            <td class="grid-col-number">${i.year}</td>
            <td class="grid-col-number">${i.amount}</td>
            <td class="grid-cell-visible-on-hover">
              <span class="expandable-toggle grid-icon-rotate"><md-icon>expand_more</md-icon></span>
            </td>
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
        ?rows-sortable="${true}"
        selectable-checkbox-selector=".selectable-checkbox"
        ?rows-selectable="${true}"
        expandable-toggle-selector=".expandable-toggle"
        table-layout="fixed"
        @exm-grid-rows-order-changed="${this.onRowsOrderChanged}"
        @exm-grid-selected-rows-change="${this.onSelectedRowsChange}"
      >
        <exm-grid-smart-toolbar
          slot="toolbar"
          amount-of-selected-items="${this.selectedRows.length}"
          .actions="${this.actions}"
          description="Income table"
          .filters="${this.filters}"
          @exm-grid-toolbar-action-executed="${this.onActionExecuted}"
          @exm-grid-toolbar-filter-changed="${this.onFilterChanged}"
        ></exm-grid-smart-toolbar>
        <table>
          <thead>
            <tr class="grid-columns">
              <th class="grid-checkbox-cell"><md-checkbox class="selectable-checkbox"></md-checkbox></th>
              <th style="width: 40px;"></th>
              <th style="width: 40px;"><span>ID</span></th>
              <th style="width: 30%;" data-column-key="month"><span>Month</span></th>
              <th style="width: 30%;" class="grid-col-number" data-column-key="year"><span>Year</span></th>
              <th style="width: 30%;" class="grid-col-number"><span>Income</span></th>
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
        ></exm-grid-pagination>
      </exm-grid>
    `;
  }
}
