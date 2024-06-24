import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { markdown } from './markdown.js';

import '@exm/exm-markdown-editor';

@customElement('exm-markdown-editor-custom-preview-demo')
export class ExmgMarkdownEditorCustomPreviewDemo extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .preview-content {
        padding-left: 0.3rem;
      }
      .preview-content > h1 {
        color: green;
      }
    `,
  ];

  render() {
    return html`
      <exm-markdown-editor value=${markdown}>
        <div slot="preview"></div>
      </exm-markdown-editor>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-markdown-editor-custom-preview-demo': ExmgMarkdownEditorCustomPreviewDemo;
  }
}
