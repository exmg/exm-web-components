import { customElement } from 'lit/decorators.js';
import { MarkdownEditorToolbarBase } from './exm-markdown-editor-toolbar-base.js';
import { style as toolbarStyles } from './styles/exm-markdown-editor-toolbar-css.js';

@customElement('exm-markdown-editor-toolbar')
export class MarkdownEditorToolbar extends MarkdownEditorToolbarBase {
  static styles = [toolbarStyles];
}

declare global {
  interface HTMLElementTagNameMap {
    'exm-markdown-editor-toolbar': MarkdownEditorToolbar;
  }
}
