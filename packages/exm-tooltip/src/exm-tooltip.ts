import { customElement } from 'lit/decorators/custom-element.js';

import { style } from './styles/exm-tooltip-styles-css.js';
import { ExmTooltipBase } from './exm-tooltip-base.js';

/**
 * `exm-tooltip`
 * Example:
 * ```html
 *  <div style="position:relative;">
 *    <button id="styledBtn">Test</button>
 *    <exm-tooltip for="styledBtn">the name means "different lizard"</exm-tooltip>
 *  </div>
 * ```
 *
 * ### Styling
 * The following custom properties and mixins are available for styling:
 *
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--exm-tooltip-font-size` | Font size of tooltip text | 10px
 * `--exm-tooltip-line-height` | Text line height | 1
 * `--exm-tooltip-background` | Background color | #616161
 * `--exm-tooltip-opacity` | Tooltip opacity | 0.9
 * `--exm-tooltip-text-color` | Font color | white
 * `--exm-tooltip-padding` | Container padding | 8px
 * `--exm-tooltip-border-radius` | Container border radius | 2px
 * `--exm-tooltip-min-width` | Breadcrumb container background color | initial
 */

@customElement('exm-tooltip')
export class ExmTooltip extends ExmTooltipBase {
  static styles = style;
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-tooltip': ExmTooltip;
  }
}
