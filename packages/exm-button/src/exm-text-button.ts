import { customElement } from 'lit/decorators/custom-element.js';
import '@material/web/progress/circular-progress.js';
import { ExmgTextButtonBase } from './exm-text-button-base.js';

import { style } from './styles/exm-text-button-styles-css.js';

/**
 * exm-text-button
 *
 * Material button including loading (spinner) animation when loading attribute is set to element.
 * This button extends the material @material/web filled button.
 *
 * @customElement exm-text-button
 * @extends ButtonFilledBase
 */
@customElement('exm-text-button')
export class ExmgTextButton extends ExmgTextButtonBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-text-button': ExmgTextButton;
  }
}
