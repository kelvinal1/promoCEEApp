import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
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
  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient, private auth: AuthService) {
    this.baseUrl = baseUrl;
}


  getPais():any{
    return this.http.get(`${this.baseUrl}${this.api}/get_paises`);
  }
  getCiudades(codigoPais: number): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/get_ciudades?pais=${codigoPais}`);
  }
  getSegmentosByUsuario() {
    return this.http.get(`${this.baseUrl}${this.api2}/getsegmentobyusuario`);
  }

  getUbicaciones(id_pais:any, id_ciudad:any,id_empresa: any, id_clouster:any ): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api3}?pais_codigo=${id_pais}&ciudad_codigo=${id_ciudad}&empresa_codigo=${id_empresa}&segmento_codigo=${id_clouster}`);
  }

  getAllUbicaciones():Observable<any>{
    return this.http.get(`${this.baseUrl}${this.api}`);
  }



}
