import { customElement } from 'lit/decorators.js';

import { style } from './styles/exm-dialog-form-css.js';
import { exmgFormStyles } from '@exmg/exm-form';
import { ExmgDialogFormBase } from './exm-dialog-form-base.js';

@customElement('exm-dialog-form')
export class ExmgDialogForm extends ExmgDialogFormBase {
  static override styles = [style, exmgFormStyles];

  override getForm() {
    return this.querySelector('form');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-dialog-form': ExmgDialogForm;
  }
}
