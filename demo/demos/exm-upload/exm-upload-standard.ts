import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';

import './file-upload-section.js';

window.uploadDefaults = {
  headers: {
    'Allow-Access-Control-Origin': '*',
  },
};

@customElement('exm-upload-standard')
export class ExmUploadStandard extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
      }
    `,
  ];

  render() {
    return html` <file-upload-section></file-upload-section>`;
  }
}
