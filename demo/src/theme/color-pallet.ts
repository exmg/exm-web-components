import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { styleMap } from 'lit/directives/style-map.js';

// eslint-disable-next-line no-undef
type WithStylesheet = typeof globalThis & { [stylesheetName: string]: CSSStyleSheet | undefined };
type PropType = { name: string; value: string };

@customElement('color-pallet')
export class ColorPallet extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      ul {
        list-style-type: none;
        margin: 0;
        padding: 0;
        column-count: 3;
        width: 900px;
      }
      li {
        width: 300px;
      }
      li .color {
        width: 100%;
        padding: 2rem;
        position: relative;
        box-sizing: border-box;
      }
      li .color span {
        background-color: white;
        color: black;
        position: absolute;
        left: 0;
        top: 0;
        padding: 0 0.4rem;
        opacity: 0.7;
      }
    `,
  ];

  @state()
  customProperties: PropType[] = [];

  @state()
  lastThemeString: string | null = null;

  protected firstUpdated() {
    // Get constructable stylesheet
    // eslint-disable-next-line no-undef
    const sheet = (globalThis as WithStylesheet)['exm-theme'];

    const customProperties: PropType[] = [];
    // @ts-ignore
    for (const rule of sheet.cssRules) {
      // @ts-ignore
      if (rule.style) {
        // @ts-ignore
        for (const property of rule.style) {
          if (property.startsWith('--md-sys')) {
            customProperties.push({
              name: property,
              // @ts-ignore
              value: rule.style.getPropertyValue(property).trim(),
            });
          }
        }
      }
    }

    this.customProperties = customProperties;
  }

  renderProperty(p: PropType) {
    const style = styleMap({ backgroundColor: p.value });
    return html`
      <li>
        <div class="color" style="${style}">
          <span>${p.name}</span>
        </div>
      </li>
    `;
  }
  render() {
    return html`
      <ul>
        ${this.customProperties.map((p) => this.renderProperty(p))}
      </ul>
    `;
  }
}
