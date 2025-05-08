import { Component } from '@angular/core';
import { SidebarComponent } from '../../../dashboard/components/sidebar/sidebar.component';

@Component({
  selector: 'app-invoice-list',
  imports: [SidebarComponent],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss',
  standalone: true,
})
export class InvoiceListComponent {}
