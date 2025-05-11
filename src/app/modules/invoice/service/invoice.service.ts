import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvoiceModel } from '../models/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = 'http://localhost:8082/payflow/api/v1/invoice';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
  }

  fetchInvoices(): Observable<{ data: InvoiceModel[] }> {
    const headers = this.getAuthHeaders();
    return this.http.get<{ data: InvoiceModel[] }>(`${this.apiUrl}`, {
      headers,
    });
  }
}
