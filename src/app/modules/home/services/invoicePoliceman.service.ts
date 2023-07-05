import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoicePolicemanService {

  private baseUrl :string;
  private api ="api/InvoicePoliceman";
  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient) {
      this.baseUrl = baseUrl;
    }

    getAll():Observable<any>{
        return this.http.get(`${this.baseUrl}${this.api}/all`);
    }

    getAllPoliceman(policeman: any):Observable<any>{
        return this.http.get(`${this.baseUrl}${this.api}/policeman?policeman=${policeman}`);
    }

    addInvoice(invoice: any): Observable<any>{
        return this.http.post(`${this.baseUrl}${this.api}/add`, invoice);
    }


    editInvoice(cod: number, invoice: any):Observable<any>{
        return this.http.put(`${this.baseUrl}${this.api}/edit?id=${cod}`, invoice);
    }

    changueStatus(pip_cod: any,status: boolean): Observable<any> {
        return this.http.put    (
            `${this.baseUrl}${this.api}/changeStatus/?id=${pip_cod}&?state=${status}`,
            {}
        );
    }
    
  }
