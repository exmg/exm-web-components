import { html, nothing } from 'lit';

import '@material/web/dialog/dialog.js';
import { MdDialog } from '@material/web/dialog/dialog.js';
import '@exmg/exm-button/exm-filled-button.js';
import '@material/web/button/text-button.js';
import '@material/web/iconbutton/icon-button.js';
import '@material/web/icon/icon.js';
import { ExmFormValidateMixin } from '@exmg/exm-form';

import { property, query } from 'lit/decorators.js';
import { ExmgElement } from '@exmg/lit-base';
import { serializeForm } from '@exmg/exm-form';

export const CLOSE_ACTION = 'close';

export class ExmDialogFormBase extends ExmFormValidateMixin(ExmgElement) {
  /**
   * Opens the dialog when set to `true` and closes it when set to `false`.
   */
  @property({ type: Boolean }) open = false;

  @property({ type: String }) type?: 'alert' | undefined;

  /**
   * Set to make the dialog position draggable.
   */
  @property({ type: Boolean }) override draggable = false;

  /**
   * Title of the dialog
   */
  @property({ type: String }) title = 'Create entry';

  /**
   * Submit button copy
   */
  @property({ type: String }) submitBtn = 'Save';

  /**
   * Cancel button copy
   */
  @property({ type: String }) cancelBtn = 'Cancel';

  /**
   * Icon of the dialog
   */
  @property({ type: String }) icon = 'close';

  /**
   * Transition kind. Supported options include: grow, shrink, grow-down,
   * grow-up, grow-left, and grow-right.
   *
   * Defaults to grow-down.
   */
  @property({ reflect: true }) transition = 'grow-down';

  /**
   * Internall used to show button spinner.
   */
  @property({ type: Boolean }) submitting = false;

  @query('md-dialog') protected dialog!: MdDialog;

  @property({ type: String }) errorMessage?: string | null;

  /**
   * Opens and shows the dialog. This is equivalent to setting the `open`
   * property to true.
   */
  show() {
    this.open = true;
    this.checkFormValidity();
  }

  /**
   * Closes the dialog. This is equivalent to setting the `open`
   * property to false.
   */
  close() {
    this.open = false;
  }

  /**
   * Opens and shows the dialog if it is closed; otherwise closes it.
   */
  toggleShow() {
    if (this.open) {
      this.close();
    } else {
      this.show();
    }
  }

  private handleCancelBtnClick() {
    this.reset();
    this.close();
  }

  reset() {
    this.errorMessage = null;
    const form = this.getForm();
    form!.reset();
  }

  /**
   * Action method that needs to be implemented
   * @param {CustomEvent} e
   */
  doAction?(formData: unknown): Promise<void> | void;

  protected async handleSubmit() {
    const form = this.getForm();
    this.errorMessage = null;

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
        this.fire('action-success');
      } catch (error) {
        this.showError(error instanceof Error ? error.message : 'Unknown error');
        this.fire('action-error', { message: error instanceof Error ? error.message : 'Unkbnown error' }, true);
      } finally {
        this.submitting = false;
        if (this.errorMessage === null) {
          this.open = false;
        }
      }
    } else {
      this.fire('action-submit', data, true);
    }
  }

  showError(message: string) {
    this.errorMessage = message;
  }

  /**
   * Method should be overriden to render form content
   */
  protected renderFormContent() {
    return html`<slot></slot>`;
  }

  protected renderError() {
    return html`<div class="error"><div>${this.errorMessage}</div></div>`;
  }

  protected render() {
    const { draggable, type } = this;
    return html` <md-dialog
      .draggable=${draggable}
      .type=${type}
      .open=${this.open}
      @closed=${() => (this.open = false)}
    >
      <span slot="headline">
        <md-icon-button @click=${() => this.close()}><md-icon>close</md-icon></md-icon-button>
        <span class="headline">${this.title}</span>
      </span>

      <div slot="content">
        ${this.errorMessage ? this.renderError() : nothing}
        <div class="content">${this.renderFormContent()}</div>
      </div>
      <div slot="actions">
        <md-text-button slot="footer" @click=${() => this.handleCancelBtnClick()}>${this.cancelBtn}</md-text-button>
        <exm-filled-button
          slot="footer"
          @click=${this.handleSubmit}
          ?disabled=${this.submitting || !this.formValid}
          ?loading=${this.submitting}
          >${this.submitBtn}</exm-filled-button
        >
      </div>
    </md-dialog>`;
  }
}
