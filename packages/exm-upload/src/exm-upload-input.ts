import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import '@exmg/exm-collapsed';
import { style } from './styles/exm-upload-input-css.js';
import { ExmgUpload } from './exm-upload.js';

@customElement('exm-upload-input')
export class ExmgUploadInput extends LitElement {
  @property({ type: Boolean })
  opened = false;

  @property({ type: Number })
  closeDelay = 400;

  static styles = [style];

  getUploadElement() {
    return this.querySelector('exm-upload') as ExmgUpload;
  }

  getInputElement() {
    return this.querySelector('[slot="input"]') as HTMLInputElement;
  }

  protected firstUpdated() {
    const upload = this.getUploadElement();
    if (upload) {
      if (upload.multiple) {
        console.warn('exm-upload-input: multiple is not supported, forcing to false');
        upload.multiple = false;
      }
    }
  }

  toggle() {
    this.opened = !this.opened;
  }

  _uploadSuccess() {
    const upload = this.getUploadElement();
    const input = this.getInputElement();

    if (!input || !upload) {
      return;
    }

    const response = upload.getValues()[0]!;
    let value = '';
    try {
      const d = JSON.parse(response);
      // @ts-ignore
      value = d.url ? d.url : response;
    } catch (error) {
      value = response;
    }

    input.value = value;

    setTimeout(() => {
      upload.reset();
      this.opened = false;
    }, this.closeDelay);
  }

  handleClick(e: CustomEvent) {
    e.preventDefault();
    const el = e.target as HTMLElement;
    const slotValue = el.getAttribute('slot');
    if (el.tagName.toLowerCase() === 'md-icon-button' && slotValue === 'trailing-icon') {
      this.toggle();
    }
  }

  render() {
    return html`
      <div class="input-wrapper">
        <div class="input" aria-expanded=${this.opened} aria-controls="collapsed">
          <slot name="input" @click=${this.handleClick}></slot>
        </div>
        <exm-collapsed id="collapsed" ?opened=${this.opened}>
          <slot name="upload" @upload-success=${this._uploadSuccess}></slot>
        </exm-collapsed>
      </div>
    `;
  }
}
