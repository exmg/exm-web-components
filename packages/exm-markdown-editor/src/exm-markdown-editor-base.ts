import { PropertyValueMap, html, nothing } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';
import { query, property, state } from 'lit/decorators.js';
import { Editor, EditorConfiguration } from 'codemirror';
import { defaultConfiguration } from './utils/configurations.js';
import { ExmgElement, observer } from '@exmg/lit-base';
import { markdownActions, toolbarActions } from './actions.js';
import { MarkdownActions, ToolbarIcons, ToolbarItem } from './types.js';
import { TokenizerAndRendererExtension, marked } from 'marked';
import { mixinElementInternals } from '@material/web/labs/behaviors/element-internals.js';
import { getFormValue, mixinFormAssociated } from '@material/web/labs/behaviors/form-associated.js';
import { toolbarIcons } from './icons.js';
import { MardownEditorValidator } from './validator/exm-markdown-editor-validator.js';
import {
  createValidator,
  getValidityAnchor,
  mixinConstraintValidation,
} from '@material/web/labs/behaviors/constraint-validation.js';

import './exm-markdown-editor-toolbar.js';

const MarkdownBaseClass = mixinConstraintValidation(mixinFormAssociated(mixinElementInternals(ExmgElement)));

/**
 * Markdown editor element.
 * An out of the box customizable Markdown Editor for Exmachina
 *
 * ```
 * <exm-markdown-editor markdown="# Header 1"></exm-markdown-editor>
 * ```
 * ### Styling
 *
 *  Custom property | Description | Default
 *  ----------------|-------------|----------
 * `--exm-markdown-editor-code-color` | Editor's text color | --md-sys-color-on-surface
 * `--exm-markdown-editor-code-cursor-color` | Editor's cursor color | --md-sys-color-on-surface
 * `--exm-markdown-editor-code-header-color` | H1 color in editor | #4a8fc0;
 * `--exm-markdown-editor-code-inline-code-color` | Inline code color | #ea881f
 * `--exm-markdown-editor-code-list-color` | Lists color | rgb(25, 165, 28)
 * `--exm-markdown-editor-selected-code-color` | Selected text color | rgb(140, 140, 140)
 * `--exm-markdown-editor-border-color` | Editor's border color | --md-sys-color-primary
 * `--exm-markdown-editor-background-color` | Toolbar and default preview background | --md-sys-color-surface-container-high
 * `--exm-markdown-editor-code-background-color` | Editor's background color when focused | --md-sys-color-surface-container-high
 *
 *  # Events:
 *  - change - where detail is current markdown value
 *  - insert-image - if the Editor is set to upload, it will trigger this event when the insert-image is clicked
 *
 * @customElement
 * @element exm-markdown-editor
 * @memberof Exmg
 * @extends ExmgElement
 * @summary Markdown editor element
 */
export class MarkdownEditorElementBase extends MarkdownBaseClass {
  @property({ type: String }) value: string = '';
  @property() html?: string;

  @property({ type: String, attribute: 'label' })
  label = '';

  @property({ type: Boolean }) upload = false;
  @property({ type: Array }) toolbarActions?: ToolbarItem[] = toolbarActions;
  @property({ type: Object }) toolbarIcons?: ToolbarIcons = toolbarIcons;
  @property({ type: Array }) markedExtension?: TokenizerAndRendererExtension[];
  @property({ type: Boolean, reflect: true }) required = false;
  @query('#editor') editorElement?: HTMLDivElement;
  @state() previewElement?: Element | null;

  @property({ type: Number })
  height: number = 400;

  @state()
  @observer(function (this: MarkdownEditorElementBase, preview: boolean) {
    if (preview === false) {
      this.codeMirrorEditor?.focus();
    }
  })
  preview = true;

  editorConfiguration: EditorConfiguration = defaultConfiguration;
  editorActions: MarkdownActions = markdownActions;
  codeMirrorEditor?: Editor;
  internalTextarea?: HTMLTextAreaElement;
  blurHandlerBinding: any;
  heightStyleMap?: any;

  reset() {
    this.value = this.getAttribute('value') ?? '';
  }

  protected updated(changedProps: PropertyValueMap<any> | Map<PropertyKey, unknown>) {
    if (changedProps.has('value') && this.codeMirrorEditor?.getValue() !== this.value) {
      this.codeMirrorEditor?.setValue(this.value);
    }
  }

  override [getFormValue]() {
    return this.value;
  }

  [createValidator]() {
    return new MardownEditorValidator(() => this);
  }

  [getValidityAnchor]() {
    return this.internalTextarea!;
  }

  override formResetCallback() {
    this.reset();
  }

  override formStateRestoreCallback(state: string) {
    this.value = state;
  }

  override focus() {
    this.codeMirrorEditor?.focus();
  }

  protected firstUpdated() {
    this.codeMirrorSetup();
    this.previewElement = this.getPreviewElement();

    /* Height */
    if (this.previewElement!.hasAttribute('slot')) {
      this.shadowRoot!.querySelector('#preview')?.remove();
      this.previewElement!.setAttribute('style', `height: ${this.height}px;`);
    }
    this.heightStyleMap = styleMap({ height: `${this.height}px` });
    this.codeMirrorEditor!.getWrapperElement().style.height = `${this.height}px`;
    /** Blur global handling */
    this.blurHandlerBinding = this.handleBlur.bind(this);
    this.addEventListener('blur', this.handleBlur);

    if (this.value) {
      this.updateValue(this.value);
      this.codeMirrorEditor!.refresh();
    }
    if (this.label && this.required) {
      this.setAttribute('aria-required', 'true');
      this.label += ' *';
    }
  }

  protected disconectedCallback() {
    this.removeEventListener('blur', this.handleBlur);
  }

  protected getPreviewElement() {
    return this.shadowRoot!.querySelector('#preview');
  }

  codeMirrorSetup() {
    if (!this.editorElement) {
      console.log('Error');
      return;
    }

    if (this.markedExtension) {
      marked.use({ extensions: this.markedExtension });
    }

    // eslint-disable-next-line
    this.codeMirrorEditor = window.CodeMirror(this.editorElement, {
      ...this.editorConfiguration,
      value: this.value || '',
    });
    this.codeMirrorEditor.on('focus', (_editor: Editor) => {
      this.handleFocus();
    });
    this.codeMirrorEditor.on('change', (editor: Editor) => {
      this.updateValue(editor.getValue());
    });
    this.internalTextarea = this.codeMirrorEditor.getInputField();
  }

  handleFocus() {
    this.codeMirrorEditor!.refresh();
  }

  handleBlur() {
    this.previewElement!.innerHTML = `
      <main class="preview-content">
        ${this.html}
      </main>
    `;
    this.preview = true;
  }

  handleAction(e: CustomEvent) {
    const actionName = e.detail;
    if (!this.editorActions[actionName]) {
      return;
    }
    this.editorActions[actionName](this.codeMirrorEditor);
    this.preview = false;
    this.codeMirrorEditor?.focus();
  }

  handleInsertImage(url: string) {
    this.editorActions['image'](this.codeMirrorEditor, url);
  }

  updateValue(newValue?: string) {
    this.html = marked.parse(newValue ?? '');
    if (this.previewElement) {
      this.previewElement.innerHTML = `
      <main class="preview-content">
        ${this.html}
      </main>
    `;
    }
    if (newValue === this.value) {
      return;
    }
    this.value = newValue || '';
    this.fire('change', this.value);
  }

  disablePreview() {
    this.preview = false;
  }

  protected render() {
    return html`
      <div
        id="markdowdEditorContainer"
        class="container"
        @click=${this.disablePreview}
        style=${this.heightStyleMap}
        ?label=${this.label}
        ?preview=${this.preview}
      >
        ${this.label
          ? html`<label ?preview=${this.preview} for="markdowdEditorContainer">${this.label}</label>`
          : nothing}
        <exm-markdown-editor-toolbar
          ?label=${this.label}
          ?preview=${this.preview}
          ?upload=${this.upload}
          @action=${this.handleAction}
          .actions=${this.toolbarActions || []}
          .icons=${this.toolbarIcons || []}
        ></exm-markdown-editor-toolbar>
        <div id="editor" ?preview=${this.preview} style=${this.heightStyleMap}></div>
        <div id="preview" ?preview=${this.preview} style=${this.heightStyleMap}></div>
        <slot name="preview" ?preview=${this.preview}></slot>
      </div>
    `;
  }
}
