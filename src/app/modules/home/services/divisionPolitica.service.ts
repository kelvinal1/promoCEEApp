import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DivisionPoliticaService {

  private baseUrl :string;
  private api ="api/DivisionPolitica";
  constructor(
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient) {
      this.baseUrl = baseUrl;
    }

    getPaises(): Observable<any> {
        return this.http.get(`${this.baseUrl}${this.api}/get_paises`);
      }
   
  }
