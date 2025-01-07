import { html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import { gridStyles } from '@exmg/exm-grid';
import { style as demoStyles } from './demo-common-css.js';

import './exm-complex-grid-with-slotted-toolbar.js';
import './exm-complex-grid-with-sortable-rows.js';
import './exm-complex-grid.js';
import './exm-grid-base-toolbar-demo.js';
import './exm-grid-pagination-demo.js';
import './exm-grid-smart-toolbar-demo.js';
import './exm-grid-toolbar-demo.js';
import './search-toolbar-demo.js';
import '../../src/theme/color-pallet.js';
import { ExmBaseGridDemo } from './exm-grid-base.js';

import { style } from '../demo-page-styles-css.js';

@customElement('exm-grid-demo')
export class ExmGridDemo extends ExmBaseGridDemo {
  static styles = [
    style,
    gridStyles,
    demoStyles,
    css`
      .expandable-toggle {
        cursor: pointer;
      }
      h4 {
        color: var(--md-sys-color-primary);
        padding-top: 1.5rem;
      }
    `,
  ];

  protected render() {
    return html`
      <div class="main centered">
        <div>
          <h4>Complex grid with toolbar</h4>
          <demo-complex-grid-with-slotted-toolbar></demo-complex-grid-with-slotted-toolbar>

          <h4>Complex grid with sortable rows</h4>
          <demo-complex-grid-sortable></demo-complex-grid-sortable>

          <h4>Complex grid including actions and filters</h4>
          <demo-complex-grid></demo-complex-grid>
          <!-- 
      <h1>Base Toolbar</h1>
      <exm-grid-base-toolbar-demo></exm-grid-base-toolbar-demo>
  
      <h1>Pagination</h1>
      <exm-grid-pagination-demo></exm-grid-pagination-demo> -->

          <!-- <h1>Smart Toolbar</h1>
      <exm-grid-smart-toolbar-demo></exm-grid-smart-toolbar-demo> -->

          <h4>Searchbar in toolbar</h4>
          <search-toolbar-demo></search-toolbar-demo>

          <color-pallet></color-pallet>
        </div>
      </div>
    `;
  }
}
