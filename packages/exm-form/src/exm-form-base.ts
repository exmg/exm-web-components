import { html, nothing } from 'lit';
import { property } from 'lit/decorators.js';

import '@exmg/exm-button/exm-text-button.js';
import '@material/web/button/text-button.js';
import '@material/web/divider/divider.js';

import { ExmgElement } from '@exmg/lit-base';
import { classMap } from 'lit/directives/class-map.js';
import { ExmFormValidateMixin } from './exm-form-validate-mixin.js';

export const CLOSE_ACTION = 'close';

export const serializeForm = (form) => {
  const obj = {};
  const formElements = form?.elements;
  const formElementsArray = Array.from(formElements);

  /**
   * Create list of checkbox elements. If no value is set the return value of the checkbox for 'on' will be a boolean
   */
  const checkboxNames = formElementsArray
    .filter((input: any) => {
      return input.value === 'on' && (input.type === 'checkbox' || input.tagName.toLowerCase().includes('checkbox'));
    })
    .map((input: any) => input.name);

  /* Same for the radio items */
  const radioNames = formElementsArray
    .filter((input: any) => {
      return input.type === 'radio' || input.tagName.toLowerCase().includes('radio');
    })
    .map((input: any) => input.name);

  const numberNames = formElementsArray
    .filter((input: any) => {
      return input.type === 'number';
    })
    .map((input: any) => input.name);

  const formData = new FormData(form);

  for (const pair of formData.entries()) {
    const key = pair[0];
    const val = pair[1];

    if (Object.hasOwnProperty.call(obj, key)) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(val);
      continue;
    }

    if (numberNames.includes(key)) {
      obj[key] = val ? parseFloat(`${val}`) : undefined;
      continue;
    }

    // When set to on convert to boolean return value
    // @ts-ignore
    if (checkboxNames.includes(key)) {
      obj[key] = val === 'on';
      continue;
    }

    // Check for a default value of on for radio items to set to true, if not, set to the value
    if (radioNames.includes(key)) {
      if (val === 'on') {
        obj[key] = val === 'on';
      } else {
        obj[key] = val;
      }
      continue;
    }

    obj[key] = formData.get(key);
  }

  // All checkboxes that are not checked will not be included in the form data and need to return false
  for (const name of checkboxNames) {
    // check for
    if (!Object.hasOwnProperty.call(obj, name)) {
      obj[name] = false;
    }
  }

  return obj;
};

export class ExmFormBase extends ExmFormValidateMixin(ExmgElement) {
  /**
   * Submit button copy
   */
  @property({ type: String }) submitBtn = 'Save';

  /**
   * Cancel button copy
   */
  @property({ type: String }) cancelBtn = 'Cancel';

  /**
   * Internall used to show button spinner.
   */
  @property({ type: Boolean }) submitting = false;

  boundHandleBlur?: (e: Event) => void;
  boundHandleKeyup?: (e: Event) => void;

  @property({ type: Boolean }) hasAsideContent = false;

  @property({ type: String }) errorMessage?: string | null;

  reset() {
    const form = this.getForm();
    form?.reset();
  }

  submit() {
    this.handleSubmit();
  }

  /**
   * Action method that needs to be implemented
   * @param {CustomEvent} e
   */
  doAction?(formData: unknown): Promise<void> | void;

  protected async handleSubmit() {
    this.errorMessage = null;
    const form = this.getForm();

    // Check form validity
    this.checkFormValidity();

    // Return when there are invalid fields
    if (!this.formValid) {
      return;
    }

    // Serialize form data
    const data = serializeForm(form!);

    if (this.doAction) {
      try {
        this.submitting = true;
        await this.doAction(data);
      } catch (error) {
        this.showError(error instanceof Error ? error.message : 'Unknown error');
        this.fire('form-error', { message: error instanceof Error ? error.message : 'Unknown error' }, true);
      } finally {
        this.submitting = false;
      }
    } else {
      this.fire('form-submit', data, true);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
  }

  protected renderToolbar() {
    return html`<div class="toolbar-container"><slot name="toolbar"></slot></div>`;
  }

  protected renderFormContent() {
    return html`<slot></slot>`;
  }

  protected renderAside() {
    return html`<slot name="aside" @slotchange="${this.handleAsideSlotChange}"></slot>`;
  }

  handleAsideSlotChange(e: CustomEvent) {
    const slot = e.target;
    // @ts-ignore
    const nodes = slot.assignedNodes({ flatten: true });
    this.hasAsideContent = nodes.length > 0;
  }

  protected renderError() {
    return html`<div class="form-error"><div>${this.errorMessage}</div></div>`;
  }

  protected renderActions() {
    return html`
      <div class="actions">
        <md-text-button slot="footer" dialogFocus @click=${() => this.fire('form-cancel')}
          >${this.cancelBtn}</md-text-button
        >
        <exm-text-button
          slot="footer"
          @click=${this.handleSubmit}
          ?disabled=${this.submitting || !this.formValid}
          ?loading=${this.submitting}
          >${this.submitBtn}</exm-text-button
        >
      </div>
    `;
  }

  protected renderContainer() {
    return html` <div class="container">
      <div class="content">${this.renderFormContent()}</div>
      <div class="aside ${classMap({ empty: !this.hasAsideContent })}">${this.renderAside()}</div>
    </div>`;
  }

  protected render() {
    return html`
      ${this.renderToolbar()} ${this.errorMessage ? this.renderError() : nothing} ${this.renderContainer()}
      <div class="divider"><md-divider></md-divider></div>
      ${this.renderActions()}
    `;
  }
}
