import { customElement } from 'lit/decorators/custom-element.js';
import '@material/web/progress/circular-progress.js';
import { ExmFilledButtonBase } from './exm-filled-button-base.js';

import { style } from './styles/exm-filled-button-styles-css.js';

/**
 * exm-filled-button
 *
 * Material button including loading (spinner) animation when loading attribute is set to element.
 * This button extends the material @material/web filled button.
 *
 * @customElement exm-filledbutton
 * @extends ButtonFilledBase
 */
@customElement('exm-filled-button')
export class ExmFilledButton extends ExmFilledButtonBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-filled-button': ExmFilledButton;
  }
}
