import { customElement } from 'lit/decorators.js';
import { style } from './styles/exm-navigation-rail-nav-item-css.js';
import { ExmgNavigationRailNavItemBase } from './exm-navigation-rail-nav-item-base.js';

@customElement('exm-navigation-rail-nav-item')
export class ExmgNavigationRailNavItem extends ExmgNavigationRailNavItemBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-navigation-rail-nav-item': ExmgNavigationRailNavItem;
  }
}
