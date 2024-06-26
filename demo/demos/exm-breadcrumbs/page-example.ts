import { html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { ExmgElement } from '@exmg/lit-base/index.js';
import { BreadcrumbsMixin } from '@exmg/exm-breadcrumbs';
import '@exmg/exm-breadcrumbs/exm-breadcrumbs.js';
import { ExmBreadcrumbs } from '@exmg/exm-breadcrumbs/exm-breadcrumbs.js';

const dummyItems = [
  { href: '/home', content: 'Home page1' },
  { href: '/users', content: 'User List1' },
  { href: '/users/1234', content: 'Mark1' },
  { href: '/users/1234/details', content: 'Details1' },
];

@customElement('page-example')
export class PageExample extends BreadcrumbsMixin(ExmgElement) {
  @query('#breadcrumbs')
  breadcrumbsElement?: ExmBreadcrumbs;

  breadcrumbs = [
    { href: '/home', content: 'Home page' },
    { href: '/users', content: 'User List' },
    { href: '/users/1234', content: 'Mark' },
  ];

  static styles = [
    css`
      :host {
        display: block;
        font-family: Roboto;
        font-size: 1rem;
      }
      .page {
        background: #eee;
        padding: 1rem;
      }
      .actions {
        margin-top: 1rem;
      }
    `,
  ];

  render() {
    return html`
      <div class="page">
        <exm-breadcrumbs id="breadcrumbs">Waiting..</exm-breadcrumbs>
        <div class="actions">
          <button @click=${() => this.emitResetBreadcrumbs()}>reset (Event)</button>
          <button @click=${() => this.emitSetBreadcrumbs(dummyItems)}>Change (Event)</button>
        </div>
      </div>
    `;
  }
}
