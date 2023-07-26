import { HttpClient, HttpEvent, HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { Almacen } from 'src/app/models/Almacen';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlmacenHomeService {
  private baseUrl: string;
  private api = "api/almacen";
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

  changeState(almacen: number, empresa: number, estado: number): any {
    let params = {
      empresa: empresa,
      codigo: almacen,
      estado: estado
    };
    return this.http.post(`${this.baseUrl}${this.api}/changestatealmacen`, params, {headers: this.headers});
  }

  saveAlmacen(almacen: Almacen): any {
    return this.http.post(`${this.baseUrl}${this.api}`, almacen, {headers: this.headers});
  }

  updateAlmacen(almacen: Almacen): any {
    return this.http.put(`${this.baseUrl}${this.api}/update`, almacen, {headers: this.headers});
  }

  getAlmacenes(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}`, {headers: this.headers});
  }

  getAlmacenesByEmpresa(empresa: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/getalmacenbyempresa/${empresa}`, {headers: this.headers});
  }

  getAlmacenesActivoByEmpresa(empresa: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/getalmacenactivobyempresa/${empresa}`, {headers: this.headers});
  }
  getAlmacenById(id: string, empresa: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/getalmacenactivobyid/${id}/${empresa}`, {headers: this.headers});
  }
  getAlmacenByHomologacion(empresa: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/getalmacenbyempresa/homologacion/${empresa}`, {headers: this.headers});
  }
}
