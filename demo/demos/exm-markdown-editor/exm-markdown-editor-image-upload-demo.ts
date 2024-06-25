import { html, css, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { markdown } from './markdown.js';
import { ExmgDialogUpload } from '@exmg/exm-upload/exm-dialog-upload.js';
import { MarkdownEditorElement } from '@exmg/exm-markdown-editor';
import '@exmg/exm-markdown-editor';

@customElement('exm-markdown-editor-image-upload-demo')
export class ExmgMarkdownEditorImageUploadDemo extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  @query('exm-dialog-upload') imageUploadDialog?: ExmgDialogUpload;
  @query('#upload') uploadImageMarkdown?: MarkdownEditorElement;

  handleImageUpload() {
    if (this.imageUploadDialog) {
      this.imageUploadDialog.toggleShow();
    }
  }
  handleDialogSubmit(e: CustomEvent) {
    this.uploadImageMarkdown && this.uploadImageMarkdown.handleInsertImage(e.detail.url);
    this.imageUploadDialog && this.imageUploadDialog.toggleShow();
  }

  render() {
    return html`
      <exm-markdown-editor id="upload" upload value=${markdown} @insert-image=${this.handleImageUpload}>
      </exm-markdown-editor>
      <exm-dialog-upload @dialog-submit=${this.handleDialogSubmit}>
        <exm-upload maxSize="1mb" accept=".jpg,.jpeg,.png,.webp,.svg" serverType="local" allowCropping></exm-upload>
      </exm-dialog-upload>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-markdown-editor-image-upload-demo': ExmgMarkdownEditorImageUploadDemo;
  }
}
