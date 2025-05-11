import { createFeatureSelector, createSelector } from '@ngrx/store';
import { InvoiceState } from '../reducers/invoice.reducer';

export const selectInvoiceState =
  createFeatureSelector<InvoiceState>('invoice');

export const selectAllInvoices = createSelector(
  selectInvoiceState,
  (state) => state.invoices
);

export const selectLoading = createSelector(
  selectInvoiceState,
  (state) => state.loading
);

export const selectError = createSelector(
  selectInvoiceState,
  (state) => state.error
);
