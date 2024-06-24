import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import '@exm/exm-search/exm-search.js';

import { style } from '../demo-page-styles-css.js';

@customElement('exm-search-demo')
export class SearchDemo extends LitElement {
  static styles = [style];

  render() {
    return html`
      <div class="main centered">
        <div>
          <h1>Search Bar</h1>
          <div class="card">
            <exm-search></exm-search>
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
