import { customElement } from 'lit/decorators.js';
import { style } from './styles/exm-navigation-toolbar-css.js';
import { ExmgNavigationToolbarBase } from './exm-navigation-toolbar-base.js';

@customElement('exm-navigation-toolbar')
export class ExmgNavigationToolbar extends ExmgNavigationToolbarBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-navigation-toolbar': ExmgNavigationToolbar;
  }
}
