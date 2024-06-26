import { customElement } from 'lit/decorators.js';
import { style } from './styles/exm-navigation-rail-nav-css.js';
import { ExmNavigationRailNavBase } from './exm-navigation-rail-nav-base.js';

@customElement('exm-navigation-rail-nav')
export class ExmNavigationRailNav extends ExmNavigationRailNavBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-navigation-rail-nav': ExmNavigationRailNav;
  }
}
