import { ExmQuerySelectors } from '../utils/exm-query-selectors.js';
import { EventDetailSelectedRowsChange } from '../types/exm-grid-types.js';

const checkCheckbox = (checkboxElement: HTMLInputElement) => {
  checkboxElement.setAttribute('checked', 'checked');
  checkboxElement.removeAttribute('indeterminate');
  checkboxElement.checked = true;
};

const uncheckCheckbox = (checkboxElement: HTMLInputElement) => {
  checkboxElement.removeAttribute('checked');
  checkboxElement.removeAttribute('indeterminate');
  checkboxElement.checked = false;
};

const indeterminateCheckbox = (checkboxElement: HTMLInputElement) => {
  checkboxElement.removeAttribute('checked');
  checkboxElement.setAttribute('indeterminate', 'true');
  checkboxElement.checked = true;
};

const syncCheckboxAttrFromProp = (checkboxElement: HTMLInputElement) => {
  if (checkboxElement.checked) {
    checkboxElement.setAttribute('checked', 'checked');
  } else {
    checkboxElement.removeAttribute('checked');
  }
};

export class ExmRowSelectable {
  allCheckbox?: HTMLInputElement;

  selectedRows: HTMLTableRowElement[] = [];

  private querySelectors: ExmQuerySelectors;
  private dispatchEvent: (event: Event) => boolean;
  private selectableCheckboxSelector?: string;
  private disableRowClickSelection: boolean;

  constructor(qs: ExmQuerySelectors, de: (event: Event) => boolean, drcs: boolean, scs?: string) {
    this.querySelectors = qs;
    this.dispatchEvent = de;
    this.selectableCheckboxSelector = scs;
    this.disableRowClickSelection = drcs;
  }
  // eslint-disable-next-line
  initFeature(bodyRows: NodeListOf<HTMLTableRowElement>) {
    const fireEvent = this.initAllCheckbox();
    const rowsSelectionSyncShouldTriggerEvent = this.syncRowSelectionWithBodyCheckboxes();
    this.updateBodyRowsListeners(bodyRows);
    if (fireEvent || rowsSelectionSyncShouldTriggerEvent) {
      this.fireSelectableRows();
    }
  }
  // eslint-disable-next-line
  updateFeature(bodyRows: NodeListOf<HTMLTableRowElement>) {
    this.updateBodyRowsListeners(bodyRows);
    const rowsSelectionSyncShouldTriggerEvent = this.syncRowSelectionWithBodyCheckboxes();
    this.updateSelectAllCheckbox();
    if (rowsSelectionSyncShouldTriggerEvent) {
      this.fireSelectableRows();
    }
  }

  syncSelectedItems() {
    if (this.syncRowSelectionWithBodyCheckboxes()) {
      this.fireSelectableRows();
    }
  }

  private fireSelectableRows() {
    this.dispatchEvent(
      new CustomEvent<EventDetailSelectedRowsChange>('exm-grid-selected-rows-change', {
        bubbles: true,
        composed: true,
        detail: {
          rows: [...this.selectedRows],
        },
      }),
    );
  }
  // eslint-disable-next-line
  private updateBodyRowsListeners(bodyRows: NodeListOf<HTMLTableRowElement>) {
    bodyRows.forEach((row) => {
      row.setAttribute('data-is-selectable', '');

      row.addEventListener('click', (e: Event) => {
        const target = e.target as HTMLElement;
        // Also TR needed for initial auto selected rows on init / if disable row selection it is only possible to use the md-checkbox
        if (
          (this.disableRowClickSelection && target.tagName !== 'MD-CHECKBOX' && target.tagName !== 'TR') ||
          (target.tagName !== 'TR' && target.tagName !== 'TD' && target.tagName !== 'MD-CHECKBOX')
        ) {
          return;
        }

        const index = this.selectedRows.indexOf(row);
        const isRowAlreadySelected = index > -1;
        if (isRowAlreadySelected) {
          row.removeAttribute('data-selected');
          this.selectedRows.splice(index, 1);
        } else {
          row.setAttribute('data-selected', '');
          this.selectedRows.push(row);
        }

        const rowCheckbox =
          this.selectableCheckboxSelector && row.querySelector<HTMLInputElement>(this.selectableCheckboxSelector);
        if (rowCheckbox && rowCheckbox !== e.target) {
          if (isRowAlreadySelected) {
            uncheckCheckbox(rowCheckbox);
          } else {
            checkCheckbox(rowCheckbox);
          }
        } else if (rowCheckbox) {
          syncCheckboxAttrFromProp(rowCheckbox);
        }

        this.updateSelectAllCheckbox();
        this.fireSelectableRows();
      });
    });
  }

  private initAllCheckbox() {
    let fireEvent = false;
    this.allCheckbox = this.selectableCheckboxSelector
      ? this.querySelectors.getColumn<HTMLInputElement>(this.selectableCheckboxSelector)
      : undefined;

    if (this.allCheckbox) {
      if (this.allCheckbox.checked) {
        this.handleAllCheckboxStateChange();
        fireEvent = true;
      }

      this.allCheckbox.addEventListener('change', () => {
        syncCheckboxAttrFromProp(this.allCheckbox!);
        this.handleAllCheckboxStateChange();
        this.fireSelectableRows();
      });
    }

    return fireEvent;
  }

  private syncRowSelectionWithBodyCheckboxes() {
    let fireEvent = false;

    if (this.selectableCheckboxSelector) {
      // remove row attribute data-selected if checkbox not selected
      this.querySelectors
        .getTableBody()
        .querySelectorAll(`tr[data-selected] ${this.selectableCheckboxSelector}:not([checked])`)
        .forEach((uncheckedCheckbox) => {
          const row = uncheckedCheckbox.closest('tr');
          if (row) {
            row.removeAttribute('data-selected');
            fireEvent = true;
          }
        });

      // add row attribute data-selected if checkbox is selected
      this.querySelectors
        .getTableBody()
        .querySelectorAll(`tr:not([data-selected]) ${this.selectableCheckboxSelector}[checked]`)
        .forEach((checkedCheckbox) => {
          const row = checkedCheckbox.closest('tr');
          if (row) {
            row.setAttribute('data-selected', '');
            fireEvent = true;
          }
        });

      const prevSelectedRowsCount = this.selectedRows.length;
      this.selectedRows = Array.from(this.querySelectors.getTableBody().querySelectorAll('tr[data-selected]'));
      if (prevSelectedRowsCount !== this.selectedRows.length) {
        fireEvent = true;
      }

      if (this.allCheckbox && !this.allCheckbox.checked) {
        if (this.selectedRows.length && this.selectedRows.length === this.querySelectors.getBodyRows().length) {
          checkCheckbox(this.allCheckbox);
        }
      }
    }

    return fireEvent;
  }

  private getBodyCheckboxes(): HTMLInputElement[] {
    return this.selectableCheckboxSelector
      ? Array.from(
          this.querySelectors.getTableBody().querySelectorAll<HTMLInputElement>(this.selectableCheckboxSelector),
        )
      : [];
  }

  private handleAllCheckboxStateChange() {
    if (this.allCheckbox!.checked) {
      this.allCheckbox!.removeAttribute('indeterminate');
      this.selectedRows = [];
      this.querySelectors.getBodyRows().forEach((row) => {
        row.setAttribute('data-selected', '');
        this.selectedRows.push(row);
      });
      this.getBodyCheckboxes().forEach((checkbox) => {
        checkCheckbox(checkbox);
      });
    } else {
      this.allCheckbox!.removeAttribute('indeterminate');
      this.selectedRows = [];
      this.querySelectors
        .getTableBody()
        .querySelectorAll<HTMLTableRowElement>('tr[data-selected]')
        .forEach((row) => {
          row.removeAttribute('data-selected');
        });
      this.getBodyCheckboxes().forEach((checkbox) => {
        uncheckCheckbox(checkbox);
      });
    }
  }

  private updateSelectAllCheckbox() {
    const selectedRowsCount = this.selectedRows.length;
    if (this.allCheckbox) {
      if (!this.allCheckbox.checked && selectedRowsCount === this.querySelectors.getBodyRows().length) {
        checkCheckbox(this.allCheckbox);
      } else if (selectedRowsCount === 0) {
        uncheckCheckbox(this.allCheckbox);
      } else if (selectedRowsCount < this.querySelectors.getBodyRows().length) {
        indeterminateCheckbox(this.allCheckbox);
      }
    }
  }
}
