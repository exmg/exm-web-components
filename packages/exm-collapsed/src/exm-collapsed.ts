import { customElement } from 'lit/decorators.js';
import { ExmgCollapsedBase } from './exm-collapsed-base.js';
import { style } from './styles/exm-collapsed-styles-css.js';

/**
 * 'exm-collapsed' element contains a slot that can be expanded or collapsed to reveal additional content or information.
 *
 * @customElement exm-collapsed
 * @extends ExmgCollapsedBase
 */
@customElement('exm-collapsed')
export class ExmgCollapsed extends ExmgCollapsedBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-collapsed': ExmgCollapsed;
  }
}
