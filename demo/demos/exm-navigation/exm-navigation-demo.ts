import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('exm-navigation-demo')
export class ExmNavigationDemo extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
        height: calc(100vh - 64px);
      }

      iframe {
        width: 100%;
        height: 100%;
        border: 1px solid yellow;
      }
    `,
  ];

  render() {
    return html`<iframe src="/demo/demos/exm-navigation/navigation-frame.html"></iframe>`;
  }
}
