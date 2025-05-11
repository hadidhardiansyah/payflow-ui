import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as InvoiceActions from '../actions/invoice.action';
import { InvoiceService } from '../../service/invoice.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class InvoiceEffects {
  private action$ = inject(Actions);
  private invoiceService = inject(InvoiceService);

  fetchInvoices$ = createEffect(() =>
    this.action$.pipe(
      ofType(InvoiceActions.fetchInvoices),
      mergeMap(() =>
        this.invoiceService.fetchInvoices().pipe(
          map((response) =>
            InvoiceActions.fetchInvoicesSuccess({ invoices: response.data })
          ),
          catchError((error: HttpErrorResponse) =>
            of(InvoiceActions.fetchInvoicesFailure({ error }))
          )
        )
      )
    )
  );
}
