import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './file-upload-section.js';

@customElement('exm-upload-default-demo')
export class ExmUploadDefaultDemo extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  protected firstUpdated() {
    window.uploadDefaults = {
      headers: {
        'Allow-Access-Control-Origin': '*',
      },
    };
  }

  render() {
    return html` <file-upload-section></file-upload-section>`;
  }
}
