import { HttpClient, HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
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

  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient, private auth: AuthService) {
    this.baseUrl = baseUrl;
  }

  changeState(almacen: number, empresa: number, estado: number): any {
    let params = {
      empresa: empresa,
      codigo: almacen,
      estado: estado
    };
    return this.http.post(`${this.baseUrl}${this.api}/changestatealmacen`, params);
  }

  saveAlmacen(almacen: Almacen): any {
    return this.http.post(`${this.baseUrl}${this.api}`, almacen);
  }

  updateAlmacen(almacen: Almacen): any {
    return this.http.put(`${this.baseUrl}${this.api}/update`, almacen);
  }


  getAlmacenes(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}`);
  }

  getAlmacenesByEmpresa(empresa: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/getalmacenbyempresa/${empresa}`);
  }

  getAlmacenesActivoByEmpresa(empresa: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/getalmacenactivobyempresa/${empresa}`);
  }
  getAlmacenById(id: string, empresa: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/getalmacenactivobyid/${id}/${empresa}`);
  }
  getAlmacenByHomologacion(empresa: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/getalmacenbyempresa/homologacion/${empresa}`);
  }
}
