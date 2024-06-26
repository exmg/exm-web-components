import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import '@exmg/exm-breadcrumbs/exm-breadcrumbs.js';
import './page-example.js';
import { style } from '../demo-page-styles-css.js';

@customElement('exm-breadcrumbs-demo')
export class BreadcrumbsDemo extends LitElement {
  static styles = [
    style,
    css`
      .toolbar {
        padding: 0.8em 1em;
        border: 1 px solid hsl(0, 0%, 90%);
        border-radius: 4px;
        background-color: var(--md-sys-color-surface-variant);
      }
      .theme exm-breadcrumbs {
        --md-sys-color-primary: green;
      }
    `,
  ];

  @state()
  private items = [
    { href: '/home', content: 'Home page' },
    { href: '/users', content: 'User List' },
    { href: '/users/1234', content: 'Mark' },
    { href: '/users/1234/details', content: 'Details' },
  ];

  render() {
    return html`
      <div class="main centered">
        <div>
          <h1>Default</h1>
          <div class="toolbar">
            <exm-breadcrumbs .items="${this.items}"></exm-breadcrumbs>
          </div>
        </div>
        <div>
          <h1>Arrow separator</h1>
          <div class="toolbar">
            <exm-breadcrumbs .items="${this.items}" arrow-separator></exm-breadcrumbs>
          </div>
        </div>
        <div>
          <h1>Page Example Mixin</h1>
          <page-example></page-example>
        </div>
      </div>
    `;
  }
}
