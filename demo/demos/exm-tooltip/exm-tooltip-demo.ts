import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators/custom-element.js';
import '@exmg/exm-tooltip/exm-tooltip.js';
import { style } from '../demo-page-styles-css.js';

@customElement('exm-tooltip-demo')
export class ExmgTooltipDemo extends LitElement {
  static styles = [
    style,
    css`
      div {
        margin: 1rem;
      }
      input,
      .avatar {
        margin: 0 10px;
      }
      .avatar {
        display: inline-block;
        box-sizing: border-box;
        width: 40px;
        height: 40px;
        padding: 8px;
        border-radius: 50%;
        cursor: pointer;
        margin: 2rem;
      }
      .blue {
        background-color: blue;
      }
      .orange {
        background-color: orange;
      }
      .green {
        background-color: green;
      }
      .red {
        background-color: red;
      }
      h1 {
        color: var(--md-sys-color-on-surface);
        padding-top: 1.5rem;
      }
      .custom-style {
        --exm-tooltip-font-size: 14px;
        --exm-tooltip-line-height: 16px;
        --md-sys-color-inverse-surface: yellow;
        --md-sys-color-inverse-on-surface: blue;
        --exm-tooltip-min-width: 200px;
      }
      .container {
        width: 300px;
        margin: 2rem auto;
      }
    `,
  ];
  render() {
    return html`
      <div class="main centered">
        <div>
          <h1>Simple Usage</h1>

          <div tabindex="0" style="display:inline-block; position:relative;">
            <input type="checkbox" />allosaurus
            <exm-tooltip>the name means "different lizard"</exm-tooltip>
          </div>
          <div tabindex="0" style="display:inline-block; position:relative;">
            <input type="checkbox" />brontosaurus
            <exm-tooltip>the name means "thunder lizard"</exm-tooltip>
          </div>
          <div tabindex="0" style="display:inline-block; position:relative;">
            <input type="checkbox" />megalosaurus
            <exm-tooltip>the name means "roof lizard"</exm-tooltip>
          </div>
        </div>

        <div style="display:inline-block; position:relative;">
          <h1>Positioning</h1>

          <div id="dir_1" class="avatar red" tabindex="0"></div>
          <div id="dir_2" class="avatar blue" tabindex="0"></div>
          <div id="dir_3" class="avatar green" tabindex="0"></div>
          <div id="dir_4" class="avatar orange" tabindex="0"></div>

          <exm-tooltip for="dir_1" position="left">👈</exm-tooltip>
          <exm-tooltip for="dir_2" position="right">👉</exm-tooltip>
          <exm-tooltip for="dir_3" position="top">👍</exm-tooltip>
          <exm-tooltip for="dir_4" position="bottom">👎</exm-tooltip>
        </div>

        <div style="display:inline-block; position:relative;">
          <h1>Offsets</h1>

          <div id="dir_5" class="avatar red" tabindex="0"></div>
          <div id="dir_6" class="avatar blue" tabindex="0"></div>
          <div id="dir_7" class="avatar green" tabindex="0"></div>
          <div id="dir_8" class="avatar orange" tabindex="0"></div>

          <exm-tooltip for="dir_5" position="left" xOffset="-200">👈 With 50 offset</exm-tooltip>
          <exm-tooltip for="dir_6" position="right" xOffset="150">👉 With 150 offset</exm-tooltip>
          <exm-tooltip for="dir_7" position="top" yOffset="150">👍 With 200 offset</exm-tooltip>
          <exm-tooltip for="dir_8" position="bottom" yOffset="-100">👎 With -100 offset</exm-tooltip>
        </div>

        <div>
          <h1>Styling</h1>

          <div tabindex="0" style="display:inline-block; position:relative;">
            <button id="styledBtn">Styled</button>
            <exm-tooltip class="custom-style" for="styledBtn">the name means "different lizard"</exm-tooltip>
          </div>
        </div>
      </div>
    `;
  }
}
