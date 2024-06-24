import { customElement } from 'lit/decorators.js';

import { ExmgDialogConfirmBase } from './exm-dialog-confirm-base.js';
import { style } from './styles/exm-dialog-confirm-css.js';

@customElement('exm-dialog-confirm')
export class ExmgDialogConfirm extends ExmgDialogConfirmBase {
  static override styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-dialog-confirm': ExmgDialogConfirm;
  }
}
