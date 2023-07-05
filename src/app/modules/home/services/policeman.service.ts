import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PolicemanService {

  private baseUrl :string;
  private api ="api/PolicemanPublic";
  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient) {
      this.baseUrl = baseUrl;
    }

    getPoliceman(item: string ): Observable<any> {
        return this.http.get(`${this.baseUrl}${this.api}/idenfifier?identifier=${item}`);
    }
    
  }
