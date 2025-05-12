import { Component, inject, OnInit } from '@angular/core';
import { SidebarComponent } from '../../../dashboard/components/sidebar/sidebar.component';
import { ShareTableComponent } from '../../../../shared/components/share-table/share-table.component';
import { Observable } from 'rxjs';
import { InvoiceModel } from '../../models/invoice.model';
import { Store } from '@ngrx/store';
import { fetchInvoices } from '../../store/actions/invoice.action';
import {
  selectAllInvoices,
  selectLoading,
} from '../../store/selectors/invoice.selectors';
import { CommonModule } from '@angular/common';
import { ManualInputComponent } from '../manual-input/manual-input.component';

@Component({
  selector: 'app-invoice-list',
  imports: [
    CommonModule,
    SidebarComponent,
    ShareTableComponent,
    ManualInputComponent,
  ],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss',
  standalone: true,
})
export class InvoiceListComponent implements OnInit {
  private store = inject(Store);

  invoices$ = this.store.select(selectAllInvoices);
  loading$ = this.store.select(selectLoading);

  showSideSheet = false;

  ngOnInit(): void {
    this.store.dispatch(fetchInvoices());
  }

  openSideSheet() {
    this.showSideSheet = true;
  }

  closeSideSheet() {
    this.showSideSheet = false;
  }
}
