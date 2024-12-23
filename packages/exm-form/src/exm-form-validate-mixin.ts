import { LitElement } from 'lit';
import { async, debounce } from '@exmg/lit-base/index.js';
import { state } from 'lit/decorators.js';

export type Constructor<T> = new (...args: any[]) => T;

export abstract class FormvalidateMixinClass extends LitElement {
  getForm?(): HTMLFormElement | null;
}

export declare class FormvalidateMixinInterface {
  formValid: boolean;
  checkFormValidity(): void;
}

export const FormvalidateMixin = <T extends Constructor<LitElement & FormvalidateMixinClass>>(superClass: T) => {
  class SelectedStateElement extends superClass {
    /**
     * Used for mixin detection because `instanceof` does not work with mixins.
     */
    @state()
    formValid = false;

    boundHandleChange?: (e: Event) => void;
    private _debouncer?: debounce.Debouncer;

    getForm() {
      return this.shadowRoot!.querySelector('form');
    }

    checkFormValidity() {
      const form = this.getForm();

      const formElements = form?.elements;
      let allValid = true;

      for (const el of formElements || []) {
        let isValid = true;
        // @ts-ignore
        if (typeof el.reportValidity === 'function') {
          // @ts-ignore
          isValid = el.checkValidity();
        }
        if (!isValid) {
          allValid = false;
        }
      }

      this.formValid = allValid;
    }

    _handleInputChange(e: Event) {
      const target = e.target as HTMLElement;

      // Only check validation every 200ms max
      this._debouncer = debounce.Debouncer.debounce(this._debouncer!, async.timeOut.after(200), () => {
        // @ts-ignore
        typeof target.reportValidity === 'function' && target.reportValidity();

        this.checkFormValidity();
      });
    }

    firstUpdated() {
      const form = this.getForm!();

      this.boundHandleChange = this._handleInputChange.bind(this);
      form!.addEventListener('keyup', this.boundHandleChange, true);
      form!.addEventListener('input', this.boundHandleChange, true);
    }

    disconnectedCallback() {
      const form = this.getForm!();
      this.boundHandleChange && form!.addEventListener('keyup', this.boundHandleChange, true);
      this.boundHandleChange && form!.addEventListener('input', this.boundHandleChange, true);
      super.disconnectedCallback();
    }
  }

  return SelectedStateElement as Constructor<FormvalidateMixinInterface> & T;
};
