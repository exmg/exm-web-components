import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';
import { markdown } from './markdown.js';
import '@exmg/exm-markdown-editor';

@customElement('exm-markdown-editor-simple-demo')
export class ExmMarkdownEditorSimpleDemo extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }

      form {
        width: 100%;
      }
    `,
  ];

  submit(e: CustomEvent) {
    console.log('Form submitted', e.detail);
  }

  render() {
    return html` <exm-form @form-submit=${this.submit}>
      <form>
        <exm-markdown-editor
          name="markdown"
          label="Exm Markdown Demo"
          value="${markdown}"
          required
        ></exm-markdown-editor>
      </form>
    </exm-form>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-markdown-editor-simple-demo': ExmMarkdownEditorSimpleDemo;
  }
}
