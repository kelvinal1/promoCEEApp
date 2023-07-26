import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { Almacen } from 'src/app/models/Almacen';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MapaEmpresasService  {
  
  private baseUrl: string;
  private api = "api/DivisionPolitica";
  private api2 ="api/segmento";
  private api3= "api/UbicacionesView"
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


  getPais():any{
    return this.http.get(`${this.baseUrl}${this.api}/get_paises`,{headers: this.headers});
  }
  getCiudades(codigoPais: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/get_ciudades?pais=${codigoPais}`,{headers: this.headers});
  }
  getSegmentosByUsuario() {
    return this.http.get(`${this.baseUrl}${this.api2}/getsegmentobyusuario`,{headers: this.headers});
  }

  getUbicaciones(id_pais:any, id_ciudad:any,id_empresa: any, id_clouster:any ): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api3}?pais_codigo=${id_pais}&ciudad_codigo=${id_ciudad}&empresa_codigo=${id_empresa}&segmento_codigo=${id_clouster}`,{headers: this.headers});
  }

  getAllUbicaciones():Observable<any>{
    return this.http.get(`${this.baseUrl}${this.api}`,{headers: this.headers});
  }



}
