import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import '@exmg/exm-upload';

window.uploadDefaults = {
  customAdapterPath: '/demo/demos/exm-upload/xhr-json-adapter.js',
  uploadUrl: 'http://localhost:3000/upload',
  headers: {
    'x-adminSession': 'sessionid',
    'Allow-Access-Control-Origin': '*',
  },
};

@customElement('exm-upload-custom-demo')
export class ExmgUploadCustomDemo extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
      }
    `,
  ];

  render() {
    return html` <pre>
window.uploadDefaults = {
    customAdapterPath: '/demo/demos/exm-upload/xhr-json-adapter.js',
    uploadUrl: 'http://localhost:3000/upload',
    headers: {
        'x-adminSession': 'sessionid',
        'Allow-Access-Control-Origin': '*',
    },
};
    </pre
      >
      <exm-upload multiple serverType="custom"> </exm-upload>`;
  }
}
