import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PolicemanService   {

  private baseUrl: string;
  private api = "api/PolicemanPublic";
  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient,
    private auth: AuthService) {
    this.baseUrl = baseUrl;
  }


  getPoliceman(item: string): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/idenfifier?identifier=${item}`, 
    {headers: new HttpHeaders().set('Authorization', 'Bearer '+this.auth.token)});
  }

  getPoliceman2(cedula: any, item: any): Observable<any> {
    let user = this.auth.getUserLog()
    let codigo = user.codigo;
    return this.http.post(`${this.baseUrl}${this.api}/getPoliceman/identifier/${cedula}/codigo/${codigo}`, item,);
  }

}
