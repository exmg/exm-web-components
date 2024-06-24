import { customElement } from 'lit/decorators.js';
import { ExmgNavigationDrawerBase } from './exm-navigation-drawer-base.js';

import { style } from './styles/exm-navigation-drawer-css.js';

@customElement('exm-navigation-drawer')
export class ExmgNavigationDrawer extends ExmgNavigationDrawerBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-navigation-drawer': ExmgNavigationDrawer;
  }
}
