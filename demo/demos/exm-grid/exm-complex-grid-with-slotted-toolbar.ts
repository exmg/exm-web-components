import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import '@material/web/checkbox/checkbox.js';
import '@polymer/paper-item';
import '@material/web/icon/icon.js';
import '@material/web/iconbutton/icon-button.js';

import '@exmg/exm-grid/src/table/exm-grid-toolbar-filters.js';
import '@exmg/exm-grid/src/table/exm-grid.js';
import '@exmg/exm-grid/src/table/exm-grid-pagination.js';
import '@exmg/exm-grid/src/table/exm-grid-base-toolbar.js';

import { style as tableStyles } from '@exmg/exm-grid/src/styles/exm-grid-styles-css.js';
import { style as demoStyles } from './demo-common-css.js';

import { DEFAULT_SORT_COLUMN, DEFAULT_SORT_DIRECTION, ExmBaseGridDemo } from './exm-grid-base.js';

@customElement('demo-complex-grid-with-slotted-toolbar')
export class ExmComplexGridWithSlottedToolbar extends ExmBaseGridDemo {
  static styles = [
    tableStyles,
    demoStyles,
    css`
      .expandable-toggle {
        cursor: pointer;
      }
    `,
  ];

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
            <td class="grid-col-number">
              <span class="expandable-toggle"
                ><md-icon-button style="pointer-events: none;"><md-icon>expand_more</md-icon></md-icon-button></span
              >
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
        table-layout="auto"
        .items="${this.items}"
        .hiddenColumnNames="${this.hiddenColumns}"
        .expandedRowIds="${this.expandedRowIds}"
        .selectedRowIds="${this.selectedRowIds}"
        selectable-checkbox-selector=".selectable-checkbox"
        ?rows-selectable="${true}"
        expandable-toggle-selector=".expandable-toggle"
        @exm-grid-selected-rows-change="${this.onSelectedRowsChange}"
        default-sort-column="${DEFAULT_SORT_COLUMN}"
        default-sort-direction="${DEFAULT_SORT_DIRECTION}"
        ?sortable="${true}"
        @exm-grid-sort-change="${this.onSortChange}"
      >
        <exm-grid-base-toolbar slot="toolbar">
          <div slot="actions">
            ${this.selectedRows.length
              ? html`
                  <md-icon-button
                    class="action"
                    icon="merge_type"
                    title="Merge"
                    @click="${this.onActionDelegate('merge')}"
                    ><md-icon>merge_type</md-icon></md-icon-button
                  >
                `
              : null}
          </div>
          <div slot="description">Income table</div>
          <div slot="filters">
            <exm-grid-toolbar-filters
              selected="all"
              .items=${[
                { label: 'Month: All', value: 'all' },
                { label: 'Month: January', value: 'january' },
                { label: 'Month: February', value: 'february' },
                { label: 'Month: March', value: 'march' },
              ]}
              @exm-grid-toolbar-filter-changed="${this.onFilterChangedComboboxDelegate('month')}"
            ></exm-grid-toolbar-filters>
          </div>
        </exm-grid-base-toolbar>
        <table>
          <thead>
            <tr class="grid-columns">
              <th class="grid-checkbox-cell"><md-checkbox class="selectable-checkbox"></md-checkbox></th>
              <th style="width: 23%;"><span>ID</span></th>
              <th data-column-key="month" style="width: 23%;" data-sort><span>Month</span></th>
              <th class="grid-col-number" style="width: 23%;" data-column-key="year" data-sort><span>Year</span></th>
              <th class="grid-col-number" style="width: 23%;" data-column-key="amount" data-sort="">
                <span>Income</span>
              </th>
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
