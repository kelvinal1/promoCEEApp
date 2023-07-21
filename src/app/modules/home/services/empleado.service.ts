import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
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


    constructor(private router: Router, @Inject('BASE_URL') baseUrl: string, private http: HttpClient, private auth: AuthService) {
        this.baseUrl = baseUrl;
    }


    findEmpleadoCedula(cedula: any, item: any): Observable<any> {
        let user = this.auth.getUserLog()
        let codigo = user.codigo;
        return this.http.post(`${this.baseUrl}${this.api}/find/cedula/${cedula}/codigo/${codigo}`, item);
    }
}

