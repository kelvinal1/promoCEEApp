import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicePolicemanService  {

  private baseUrl: string;
  private api = "api/InvoicePoliceman";
  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient, private auth: AuthService) {
    this.baseUrl = baseUrl;
}



  getAll(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/all`);
  }

  getAllPoliceman(policeman: any): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/policeman?policeman=${policeman}`);
  }

  getAllEmployee(identifier: any): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/employee/${identifier}`);
  }

  addInvoice(invoice: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.api}/add`, invoice);
  }

  addInvoiceEmployee(invoice: any): Observable<any> {
    return this.http.post(`${this.baseUrl}${this.api}/addEmployee`, invoice);
  }


  editInvoice(cod: number, invoice: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${this.api}/edit?id=${cod}`, invoice);
  }

  editInvoiceEmployee(cod: number, invoice: any): Observable<any> {
    return this.http.put(`${this.baseUrl}${this.api}/editEmployee?id=${cod}`, invoice);
  }

  changueStatus(pip_cod: any, status: boolean): Observable<any> {
    return this.http.put(
      `${this.baseUrl}${this.api}/changeStatus/?id=${pip_cod}&?state=${status}`,
      {}
    );
  }

}
