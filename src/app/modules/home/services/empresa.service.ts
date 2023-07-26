import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  private baseUrl: string;
  private api = "api/empresa";
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `${environment.token}`,
  });

  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient, private auth: AuthService) {
    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${environment.token}`,
    });
}

  getEmpresas(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}`,{headers:this.headers});
  }


}
