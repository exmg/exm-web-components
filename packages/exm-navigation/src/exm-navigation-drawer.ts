import { customElement } from 'lit/decorators.js';
import { ExmNavigationDrawerBase } from './exm-navigation-drawer-base.js';

import { style } from './styles/exm-navigation-drawer-css.js';

@customElement('exm-navigation-drawer')
export class ExmNavigationDrawer extends ExmNavigationDrawerBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-navigation-drawer': ExmNavigationDrawer;
  }
}
