export interface InvoiceModel {
  invoiceNo: string;
  fromCompany: CompanyModel;
  toCompany: CompanyModel;
  createdDate: string;
  maturityDate: string;
  status: string;
  amount: number;
  notes: string;
}

export interface CompanyModel {
  companyId: string;
  companyName: string;
}
