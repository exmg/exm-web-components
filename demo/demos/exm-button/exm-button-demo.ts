import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import { property } from 'lit/decorators.js';

import '@exm/exm-button/exm-filled-button.js';
import '@exm/exm-button/exm-text-button.js';

import { style } from '../demo-page-styles-css.js';

@customElement('exm-button-demo')
export class ButtonDemo extends LitElement {
  @property({ type: Boolean })
  loading = false;

  static styles = [style];

  render() {
    return html`
      <div class="main centered">
        <div>
          <h1>Filled Button Loading (click it!)</h1>
          <exm-filled-button @click=${() => (this.loading = !this.loading)} ?loading=${this.loading}
            >LOADING</exm-filled-button
          >
        </div>
        <div>
          <h1>Filled Button Loading disabled</h1>
          <exm-filled-button disabled loading>LOADING</exm-filled-button>
        </div>

        <div>
          <h1>Text Button Loading (click it!)</h1>
          <exm-text-button @click=${() => (this.loading = !this.loading)} ?loading=${this.loading}
            >LOADING</exm-text-button
          >
        </div>
        <div>
          <h1>Text Button Loading disabled</h1>
          <exm-text-button disabled loading>LOADING</exm-text-button>
        </div>
      </div>
    `;
  }
}
