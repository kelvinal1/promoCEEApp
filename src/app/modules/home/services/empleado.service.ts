import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private baseUrl :string;
  private api ="api/Empleado";
  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient) {
      this.baseUrl = baseUrl;
    }

    findEmpleadoCedula(cedula: any, item: any ): Observable<any> {
        return this.http.post(`${this.baseUrl}${this.api}/find/cedula/${cedula}`,item);
    }
    

  }
