import { HttpBackend, HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SegmentoService {

  private baseUrl: string;
  private api = "api/segmento";
  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `${environment.token}`,
  });

  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient,
    private auth: AuthService) {
    this.baseUrl = baseUrl;
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `${environment.token}`,
    });
  }

  getSegmentos(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}`,{headers: this.headers});
  }

  getSegmentosByEmpresa(emp_id: number) {
    return this.http.get(`${this.baseUrl}${this.api}/getsegmentobyempresa/${emp_id}`,{headers: this.headers});
  }

  getSegmentosByUsuario(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/getsegmentobyusuario`,{headers: this.headers});
  }

  getSegmentoByUsuarioEmpresa(empresa: number) {
    return this.http.get(`${this.baseUrl}${this.api}/getsegmentobyusuarioempresa/${empresa}`,{headers: this.headers});
  }



}
