import { html } from 'lit';
import { property } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';

import { DragAndDropMixin } from './mixins/exm-upload-drag-drop-mixin.js';
import { ExmgElement } from '@exmg/lit-base';

export class ExmUploadDropAreaBase extends DragAndDropMixin(ExmgElement) {
  @property({ type: String })
  description?: string;

  @property({ type: Boolean })
  disabled?: boolean;

  render() {
    return html` <div
      class="drop ${classMap({
        disabled: !!this.disabled,
        dropHover: this.dragOver && !this.disabled,
      })}"
      @dragover=${this.onDragOver}
      @dragleave=${this.onDragLeave}
      @drop=${this.onDrop}
    >
      <div class="drop-container">
        <slot name="drop-icon"></slot>
        <span class="drop-text">
          <slot name="drop-text"></slot>
        </span>
        <span class="description">${this.description}</span>
      </div>
    </div>`;
  }
}
