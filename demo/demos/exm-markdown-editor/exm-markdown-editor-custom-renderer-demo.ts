import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { markdown } from './markdown.js';
import './exm-markdown-editor-custom-demo.js';

@customElement('exm-markdown-editor-custom-renderer-demo')
export class ExmgMarkdownEditorCustomRendererDemo extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
    `,
  ];

  render() {
    return html`
      <exm-markdown-editor-custom-demo value=${`-- Underline ! --\n${markdown}`}></exm-markdown-editor-custom-demo>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-markdown-editor-custom-renderer-demo': ExmgMarkdownEditorCustomRendererDemo;
  }
}
