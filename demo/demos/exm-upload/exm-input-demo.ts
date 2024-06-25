import { LitElement, html, css } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import '@exmg/exm-upload/exm-upload.js';
import '@exmg/exm-upload/exm-upload-input.js';
import { ExmgUploadInput } from '@exmg/exm-upload/exm-upload-input.js';
import '@material/web/textfield/filled-text-field.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';

@customElement('exm-input-demo')
export class ExmgInputDemo extends LitElement {
  @query('exm-upload-input')
  input?: ExmgUploadInput;

  static styles = [
    css`
      :host {
        display: block;
        width: 100%;
      }

      md-filled-text-field,
      exm-upload-input {
        display: block;
      }
      exm-upload a {
        color: #0071dc;
        text-decoration: none;
      }

      exm-upload svg {
        fill: #0071dc;
      }
    `,
  ];

  render() {
    return html`
      <exm-upload-input>
        <md-filled-text-field slot="input" label="imageUrl" name="imageUrl"
          ><md-icon-button slot="trailing-icon"><md-icon>upload</md-icon></md-icon-button></md-filled-text-field
        >
        <exm-upload slot="upload" for="imageUrl" maxSize="10mb" serverType="local"> </exm-upload>
      </exm-upload-input>
    `;
  }
}
