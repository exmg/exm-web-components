import { LitElement } from 'lit';
import { SignalWatcher } from '@lit-labs/preact-signals';
import { themeCurrentMode } from './theme-signals.js';
import { getCurrentMode, isModeDark } from './theme.js';

export type Constructor<T> = new (...args: any[]) => T;

export abstract class ThemeClass extends LitElement {}

export declare class ThemeInterface {
  isDarkMode(): boolean;
}

export const ThemeMixin = <T extends Constructor<LitElement & ThemeClass>>(base: T) => {
  // eslint-disable-next-line
  class ExmTheme extends SignalWatcher(base) {
    connectedCallback(): void {
      super.connectedCallback();
      // Read current mode from local storage
      themeCurrentMode.value = getCurrentMode() || 'auto';
    }

    isDarkMode() {
      return isModeDark(themeCurrentMode.value);
    }
  }

  return ExmTheme as Constructor<ThemeInterface> & T;
};
