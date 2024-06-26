import { customElement } from 'lit/decorators.js';
import { style } from './styles/exm-navigation-toolbar-css.js';
import { ExmNavigationToolbarBase } from './exm-navigation-toolbar-base.js';

@customElement('exm-navigation-toolbar')
export class ExmNavigationToolbar extends ExmNavigationToolbarBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-navigation-toolbar': ExmNavigationToolbar;
  }
}
