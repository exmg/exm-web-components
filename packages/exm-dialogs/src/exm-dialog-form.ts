import { customElement } from 'lit/decorators.js';

import { style } from './styles/exm-dialog-form-css.js';
import { formStyles } from '@exmg/exm-form';
import { ExmDialogFormBase } from './exm-dialog-form-base.js';

@customElement('exm-dialog-form')
export class ExmDialogForm extends ExmDialogFormBase {
  static override styles = [style, formStyles];

  override getForm() {
    return this.querySelector('form');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-dialog-form': ExmDialogForm;
  }
}
