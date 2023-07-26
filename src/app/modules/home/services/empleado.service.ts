import { HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';

@Injectable({
    providedIn: 'root'
})
export class EmpleadoService {

    private baseUrl: string;
    private api = "api/Empleado";
    private headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.auth.token}`,
      });

    constructor(private router: Router, @Inject('BASE_URL') baseUrl: string, private http: HttpClient, private auth: AuthService) {
        this.baseUrl = baseUrl;
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.auth.token}`,
          });
    }

    findEmpleadoCedula(cedula: any, item: any): Observable<any> {
        let user = this.auth.getUserLog()
        let codigo = user.codigo;
        this.headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.auth.token}`,
          });
        return this.http.post(`${this.baseUrl}${this.api}/find/cedula/${cedula}/codigo/${codigo}`, item,{headers: this.headers });
    }
}

