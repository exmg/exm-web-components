import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { repeat } from 'lit/directives/repeat.js';
import '@exmg/exm-grid/src/table/exm-grid.js';
import '@exmg/exm-grid/src/table/exm-grid-pagination.js';
import { style as tableStyles } from '@exmg/exm-grid/src/styles/exm-grid-styles-css.js';
import { style as demoStyles } from './demo-common-css.js';

import { ExmBaseGridDemo } from './exm-grid-base.js';

@customElement('demo-simple-grid')
export class DemoSimpleGridTable extends ExmBaseGridDemo {
  static styles = [demoStyles, tableStyles];

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

  protected render() {
    return html`
      <h1>Simple table</h1>
      <h2>Exm Theme</h2>
      <exm-grid .items="${this.items}">
        <table>
          <thead>
            <tr class="grid-columns">
              <th><span>ID</span></th>
              <th><span>Month</span></th>
              <th class="grid-col-number"><span>Year</span></th>
              <th class="grid-col-number"><span>Income</span></th>
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
