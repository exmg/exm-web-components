import { customElement } from 'lit/decorators.js';
import { style } from './styles/exm-breadcrumbs-styles-css.js';
import { ExmBreadcrumbsBase } from './exm-breadcrumbs-base.js';

/**
 * exm-breadcrumbs
 *
 * Component to render breadcrumbs within a page or component with the option to enable / disable arrow seperator
 *
 *  * Example:
 * ```js
 * @state()
 * private items = [
 *    {href: '/home', content: 'Home page'},
 *    {href: '/users', content: 'User List'},
 *    {href: '/users/1234', content: 'Mark'},
 *    {href: '/users/1234/details', content: 'Details'},
 *  ];
 * ```
 *
 * ```html
 *  <exm-breadcrumbs .items="${this.items}"></exm-breadcrumbs>
 * ```
 *
 */
@customElement('exm-breadcrumbs')
export class ExmBreadcrumbs extends ExmBreadcrumbsBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-breadcrumbs': ExmBreadcrumbs;
  }
}
