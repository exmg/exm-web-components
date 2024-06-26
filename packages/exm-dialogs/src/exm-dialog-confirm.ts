import { customElement } from 'lit/decorators.js';

import { ExmDialogConfirmBase } from './exm-dialog-confirm-base.js';
import { style } from './styles/exm-dialog-confirm-css.js';

@customElement('exm-dialog-confirm')
export class ExmDialogConfirm extends ExmDialogConfirmBase {
  static override styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-dialog-confirm': ExmDialogConfirm;
  }
}
