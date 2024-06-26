import { ExmQuerySelectors } from '../utils/exm-query-selectors.js';
import { EventDetailSortChange, SORT_DIRECTION } from '../types/exm-grid-types.js';

export class ExmColumnSortable {
  private querySelectors: ExmQuerySelectors;
  private dispatchEvent: (event: Event) => boolean;
  private defaultSortColumn?: string;
  private defaultSortDirection?: SORT_DIRECTION;

  constructor(qs: ExmQuerySelectors, de: (e: Event) => boolean, dsc?: string, dsd?: SORT_DIRECTION) {
    this.querySelectors = qs;
    this.dispatchEvent = de;
    this.defaultSortColumn = dsc;
    this.defaultSortDirection = dsd;
  }

  initFeature() {
    this.querySelectors.getColumns('th[data-sort]').forEach((column) => {
      const columnId = column.getAttribute('data-sort') || column.getAttribute('data-column-key')!;

      //  set default sort column if any
      if (!!this.defaultSortColumn && !!this.defaultSortDirection && this.defaultSortColumn === columnId) {
        column.setAttribute('data-sort-direction', this.defaultSortDirection);
      }

      this.registerListeners(column, columnId);
    });
  }

  private registerListeners(column: HTMLElement, columnId: string) {
    column.addEventListener('click', () => {
      const columnSortDirection = column.getAttribute('data-sort-direction');
      const nextSortDirection =
        columnSortDirection === 'ASC' ? 'DESC' : columnSortDirection === 'DESC' ? undefined : 'ASC';
      // reset previous
      this.querySelectors
        .getColumns('th[data-sort-direction=ASC], th[data-sort-direction=DESC]')
        .forEach((alreadySortedColumn) => {
          if (alreadySortedColumn !== column) {
            alreadySortedColumn.removeAttribute('data-sort-direction');
          }
        });

      if (nextSortDirection) {
        column.setAttribute('data-sort-direction', nextSortDirection);
      } else {
        column.removeAttribute('data-sort-direction');
      }

      this.fireSortChanged(columnId, nextSortDirection);
    });
  }

  private fireSortChanged(columnId: string, sortDirection?: SORT_DIRECTION) {
    this.dispatchEvent(
      new CustomEvent<EventDetailSortChange>('exm-grid-sort-change', {
        bubbles: true,
        composed: true,
        detail: {
          column: columnId,
          sortDirection: sortDirection ? sortDirection : undefined,
        },
      }),
    );
  }
}
