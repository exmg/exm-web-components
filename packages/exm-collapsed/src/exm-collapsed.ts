import { customElement } from 'lit/decorators.js';
import { ExmCollapsedBase } from './exm-collapsed-base.js';
import { style } from './styles/exm-collapsed-styles-css.js';

/**
 * 'exm-collapsed' element contains a slot that can be expanded or collapsed to reveal additional content or information.
 *
 * @customElement exm-collapsed
 * @extends ExmCollapsedBase
 */
@customElement('exm-collapsed')
export class ExmCollapsed extends ExmCollapsedBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-collapsed': ExmCollapsed;
  }
}
