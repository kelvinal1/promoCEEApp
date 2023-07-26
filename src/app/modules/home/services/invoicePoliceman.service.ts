import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
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
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.auth.token}`,
  });
  
  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient, private auth: AuthService) {
    this.baseUrl = baseUrl;

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.token}`,
    });
}



  getAll(): Observable<any> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.token}`,
    });
    return this.http.get(`${this.baseUrl}${this.api}/all`, {headers: this.headers});
  }

  getAllPoliceman(policeman: any): Observable<any> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.token}`,
    });
    return this.http.get(`${this.baseUrl}${this.api}/policeman?policeman=${policeman}`, {headers: this.headers});
  }

  getAllEmployee(identifier: any): Observable<any> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.token}`,
    });
    return this.http.get(`${this.baseUrl}${this.api}/employee/${identifier}`, {headers: this.headers});
  }

  addInvoice(invoice: any): Observable<any> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.token}`,
    });
    return this.http.post(`${this.baseUrl}${this.api}/add`, invoice, {headers: this.headers});
  }

  addInvoiceEmployee(invoice: any): Observable<any> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.token}`,
    });
    return this.http.post(`${this.baseUrl}${this.api}/addEmployee`, invoice, {headers: this.headers});
  }


  editInvoice(cod: number, invoice: any): Observable<any> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.token}`,
    });
    return this.http.put(`${this.baseUrl}${this.api}/edit?id=${cod}`, invoice, {headers: this.headers});
  }

  editInvoiceEmployee(cod: number, invoice: any): Observable<any> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.token}`,
    });
    return this.http.put(`${this.baseUrl}${this.api}/editEmployee?id=${cod}`, invoice, {headers: this.headers});
  }

  changueStatus(pip_cod: any, status: boolean): Observable<any> {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.auth.token}`,
    });
    return this.http.put(
      `${this.baseUrl}${this.api}/changeStatus/?id=${pip_cod}&?state=${status}`,
      {}, {headers: this.headers}
    );
  }

}
