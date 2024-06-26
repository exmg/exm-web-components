import { customElement } from 'lit/decorators.js';

import { style } from './styles/exm-form-drawer-styles-css.js';
import { ExmFormDrawerBase } from './exm-form-drawer-base.js';
import { exmgFormStyles } from '@exmg/exm-form';

@customElement('exm-form-drawer')
export class ExmFormDrawer extends ExmFormDrawerBase {
  static override styles = [style, exmgFormStyles];
  override getForm() {
    return this.querySelector('form');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-form-drawer': ExmFormDrawer;
  }
}
