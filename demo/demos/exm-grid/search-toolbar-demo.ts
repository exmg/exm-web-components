import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import { ExmgBaseGridDemo } from './exm-grid-base.js';

import '@exm/exm-grid/src/table/exm-grid-smart-toolbar.js';
import '@exm/exm-grid/src/table/exm-grid.js';
import '@exm/exm-grid/src/table/exm-grid-pagination.js';

import { style as tableStyles } from '@exm/exm-grid/src/styles/exm-grid-styles-css.js';
import { style as demoStyles } from './demo-common-css.js';

@customElement('search-toolbar-demo')
export class SearchToolbarDemo extends ExmgBaseGridDemo {
  static styles = [demoStyles, tableStyles];

  private description = 'Table 1';

  private renderTableBody() {
    return repeat(
      this.items,
      ({ id }) => id,
      (i) => {
        return html`
          <tr data-row-key="${i.id}">
            <td>#${i.id}</td>
            <td>${i.month}</td>
            <td class="grid-col-number">${i.year}</td>
            <td class="grid-col-number">${i.amount}</td>
          </tr>
        `;
      },
    );
  }

  render() {
    return html`
      <style>
        :host {
          padding: 10px;
          display: block;
        }
      </style>
      <exm-grid .items="${this.items}" .hiddenColumnNames="${this.hiddenColumns}">
        <exm-grid-smart-toolbar
          searchEnabled
          searchPlaceholder="Search for income by month or year"
          description="${this.description}"
          .filters="${this.filters}"
          show-column-filter
          .columnFilterColumns="${this.columns}"
          @exm-grid-toolbar-action-executed="${this.onActionExecuted}"
          @exm-grid-toolbar-filter-changed="${this.onFilterChanged}"
          @exm-grid-toolbar-setting-changed="${this.onSettingChanged}"
          @exm-grid-toolbar-search-changed="${this.onSearchChanged}"
        ></exm-grid-smart-toolbar>
        <table>
          <thead>
            <tr class="grid-columns">
              <th><span>ID</span></th>
              <th data-column-key="month"><span>Month</span></th>
              <th data-column-key="year" class="grid-col-number"><span>Year</span></th>
              <th data-column-key="amount" class="grid-col-number"><span>Income</span></th>
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
          item-count="${this.getTotalCount()}"
          @exm-grid-pagination-page-changed="${this.onPageChange}"
          @exm-grid-pagination-page-size-changed="${this.onPageSizeChange}"
        >
        </exm-grid-pagination>
      </exm-grid>
    `;
  }
}
