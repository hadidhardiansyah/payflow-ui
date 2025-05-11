import { fetchInvoices } from './../actions/invoice.action';
import { createReducer, on } from '@ngrx/store';
import * as InvoiceActions from '../actions/invoice.action';
import { InvoiceModel } from '../../models/invoice.model';

export interface InvoiceState {
  invoices: InvoiceModel[];
  loading: boolean;
  error: any;
}

export const initialState: InvoiceState = {
  invoices: [],
  loading: false,
  error: null,
};

export const invoiceReducer = createReducer(
  initialState,
  on(InvoiceActions.fetchInvoices, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(InvoiceActions.fetchInvoicesSuccess, (state, { invoices }) => ({
    ...state,
    loading: false,
    invoices: invoices,
  })),
  on(InvoiceActions.fetchInvoicesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
