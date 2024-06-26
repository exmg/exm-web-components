import { LitElement, html } from 'lit';

export class ExmNavigationRailNavBase extends LitElement {
  render() {
    return html`<nav aria-label="Main">
      <slot></slot>
    </nav>`;
  }
}
