import { HttpErrorResponse } from '@angular/common/http';
import { InvoiceModel } from './../../models/invoice.model';
import { createAction, props } from '@ngrx/store';

export const fetchInvoices = createAction('[Invoice] Fetch Invoices');

export const fetchInvoicesSuccess = createAction(
  '[Invoice] Fetch Invoices Success',
  props<{ invoices: InvoiceModel[] }>()
);

export const fetchInvoicesFailure = createAction(
  '[Invoice] Fetch Invoices Failure',
  props<{ error: HttpErrorResponse }>()
);
