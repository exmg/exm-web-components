import { customElement } from 'lit/decorators.js';
import { style } from './styles/exm-navigation-rail-nav-item-css.js';
import { ExmNavigationRailNavItemBase } from './exm-navigation-rail-nav-item-base.js';

@customElement('exm-navigation-rail-nav-item')
export class ExmNavigationRailNavItem extends ExmNavigationRailNavItemBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-navigation-rail-nav-item': ExmNavigationRailNavItem;
  }
}
