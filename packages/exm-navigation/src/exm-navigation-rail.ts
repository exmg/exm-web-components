import { customElement } from 'lit/decorators/custom-element.js';
import { ExmNavigationRailBase } from './exm-navigation-rail-base.js';

import { style } from './styles/exm-navigation-rail-css.js';

@customElement('exm-navigation-rail')
export class ExmNavigationRail extends ExmNavigationRailBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-navigation-rail': ExmNavigationRail;
  }
}
