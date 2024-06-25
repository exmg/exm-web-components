import { customElement } from 'lit/decorators.js';

import { style } from './styles/exm-form-drawer-styles-css.js';
import { ExmgFormDrawerBase } from './exm-form-drawer-base.js';
import { exmgFormStyles } from '@exmg/exm-form';

@customElement('exm-form-drawer')
export class ExmgFormDrawer extends ExmgFormDrawerBase {
  static override styles = [style, exmgFormStyles];
  override getForm() {
    return this.querySelector('form');
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-form-drawer': ExmgFormDrawer;
  }
}
