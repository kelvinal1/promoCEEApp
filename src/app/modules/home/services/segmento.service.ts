import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SegmentoService {

  private baseUrl :string;
  private api ="api/segmento";
  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient) {
      this.baseUrl = baseUrl;
    }

    getSegmentos():Observable<any>{
      return this.http.get(`${this.baseUrl}${this.api}`);
    }

    getSegmentosByEmpresa(emp_id: number) {
      return this.http.get(`${this.baseUrl}${this.api}/getsegmentobyempresa/${emp_id}`);
    }

    getSegmentosByUsuario():Observable<any> {
      return this.http.get(`${this.baseUrl}${this.api}/getsegmentobyusuario`);
    }

    getSegmentoByUsuarioEmpresa(empresa: number){
      return this.http.get(`${this.baseUrl}${this.api}/getsegmentobyusuarioempresa/${empresa}`);
    }

   

  }
