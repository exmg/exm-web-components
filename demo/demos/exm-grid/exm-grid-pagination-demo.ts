import { html, LitElement } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@exm/exm-grid/src/table/exm-grid-pagination.js';

@customElement('exm-grid-pagination-demo')
export class ExmgGridSmartToolbarDemo extends LitElement {
  @state()
  private pageIndex = 0;

  @state()
  private pageSize = 20;

  @state()
  private itemCount = 50;

  private onGridPageSizeChanged() {
    // console.log('onGridPageSizeChanged', e.detail);
  }

  private onGridPageChanged() {
    // console.log('onGridPageChanged', e.detail);
  }

  render() {
    return html`
      <style>
        :host {
          --mdc-theme-primary: #0070db;
          --mdc-theme-surface: #fff;
          --mdc-theme-on-surface: #091e2e;

          padding: 10px;
          display: block;
          background-color: #f6f6f6;
        }
      </style>
      <exm-grid-pagination
        page-index=${this.pageIndex}
        page-size=${this.pageSize}
        item-count="${this.itemCount}"
        @exm-grid-pagination-page-size-changed="${this.onGridPageSizeChanged}"
        @exm-grid-pagination-page-changed="${this.onGridPageChanged}"
      >
      </exm-grid-pagination>
    `;
  }
}
