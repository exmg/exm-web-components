import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import '@exmg/exm-search/exm-search.js';

import { style } from '../demo-page-styles-css.js';
import { property } from 'lit/decorators.js';

@customElement('exm-search-demo')
export class SearchDemo extends LitElement {
  static styles = [style];

  @property({ type: String })
  inputValue = 'abc';

  render() {
    return html`
      <div class="main centered">
        <div>
          <h1>Search Bar</h1>
          <div class="card">
            <exm-search
              filterValue=${this.inputValue}
              @search-value-change=${(e: CustomEvent) => console.log('update: ', e.detail.value)}
            ></exm-search>
          </div>
          <h1>Search Bar (disable tab focus)</h1>
          <div class="card">
            <exm-search tabindex="-1"></exm-search>
          </div>
        </div>
      </div>
    `;
  }
}
