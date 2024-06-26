import { customElement } from 'lit/decorators.js';

import { style } from './styles/exm-form-base-css.js';
import { ExmFormBase } from './exm-form-base.js';

@customElement('exm-form')
export class ExmForm extends ExmFormBase {
  static override styles = [style];

  override getForm() {
    return this.querySelector('form');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    // @ts-ignore
    'exm-form': ExmForm;
  }
}
