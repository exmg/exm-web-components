import { customElement } from 'lit/decorators/custom-element.js';
import { ExmgNavigationRailBase } from './exm-navigation-rail-base.js';

import { style } from './styles/exm-navigation-rail-css.js';

@customElement('exm-navigation-rail')
export class ExmgNavigationRail extends ExmgNavigationRailBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-navigation-rail': ExmgNavigationRail;
  }
}
