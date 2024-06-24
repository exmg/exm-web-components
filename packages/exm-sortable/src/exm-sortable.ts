import { customElement } from 'lit/decorators.js';
import { SortableElementBase } from './exm-sortable-base.js';

/**
 * The `<exm-sortable>` element Enables drag and drop sorting of nodes in a list, table or any other set of
 * elements.
 *
 * !!! You should always handle @dom-order-change to update your local .items property to update sorted list properly
 *
 * ```html
 * <exm-sortable item-selector="li" @dom-order-change="${this.myChangeHandler}">
 *  <ul>
 *     ${this.items.map((item) => {
 *       return html`
 *         <li>${item}</li>
 *       `;
 *     })}
 *  </ul>
 * </exm-sortable>
 * ```
 * @extends {SortableElementBase}
 */
@customElement('exm-sortable')
export class SortableElement extends SortableElementBase {}

declare global {
  interface HTMLElementTagNameMap {
    'exm-sortable': SortableElement;
  }
}
