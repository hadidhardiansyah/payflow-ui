import { CurrencyPipe } from './../../pipe/currency-pipe/currency.pipe';
import { Component, Input } from '@angular/core';
import { InvoiceModel } from '../../../modules/invoice/models/invoice.model';
import { CommonModule } from '@angular/common';
import { DatePipe } from '../../pipe/date-pipe/date.pipe';

@Component({
  selector: 'app-share-table',
  imports: [CommonModule, CurrencyPipe, DatePipe],
  templateUrl: './share-table.component.html',
  styleUrl: './share-table.component.scss',
  standalone: true,
})
export class ShareTableComponent {
  @Input() invoices: InvoiceModel[] = [];
}
