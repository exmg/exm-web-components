import { customElement } from 'lit/decorators/custom-element.js';
import '@material/web/progress/circular-progress.js';
import { ExmSearchBase } from './exm-search-base.js';

import { style } from './styles/exm-search-css.js';

@customElement('exm-search')
export class ExmSearch extends ExmSearchBase {
  static styles = [style];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-search': ExmSearch;
  }
}
