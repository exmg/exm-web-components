import { ExmQuerySelectors } from '../utils/exm-query-selectors.js';

export class ExmRowExpandable {
  private querySelectors: ExmQuerySelectors;
  private expandableToggleSelector: string;

  constructor(qs: ExmQuerySelectors, ets: string) {
    this.querySelectors = qs;
    this.expandableToggleSelector = ets;
  }

  initFeature() {
    this.querySelectors
      .getTableBody()
      .querySelectorAll<HTMLElement>(`${this.expandableToggleSelector}:not([data-is-expandable])`)
      .forEach((triggerElement) => {
        triggerElement.setAttribute('data-is-expandable', '');
        this.registerClickListener(triggerElement);
      });
  }

  updateFeature() {
    this.initFeature();
  }

  private registerClickListener(triggerElement: HTMLElement) {
    triggerElement.addEventListener('click', (event: Event) => {
      const parentRow = triggerElement.closest('tr');
      const rowDetail = parentRow && (parentRow.nextElementSibling as HTMLTableRowElement);
      if (!parentRow || !rowDetail) {
        // console.error(`Cannot find parent <tr> for selector ${this.expandableToggleSelector}`);
        return;
      }
      event.preventDefault();
      event.stopPropagation();

      const isExpanded = triggerElement.hasAttribute('data-is-expanded');
      if (isExpanded) {
        triggerElement.removeAttribute('data-is-expanded');
        rowDetail.removeAttribute('data-is-row-expanded');
        parentRow.removeAttribute('data-has-expanded-detail');
      } else {
        triggerElement.setAttribute('data-is-expanded', '');
        rowDetail.setAttribute('data-is-row-expanded', '');
        parentRow.setAttribute('data-has-expanded-detail', '');
      }
    });
  }
}
