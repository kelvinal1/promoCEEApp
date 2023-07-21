import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DivisionPoliticaService  {

  private baseUrl: string;
  private api = "api/DivisionPolitica";
  constructor(private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private http: HttpClient, private auth: AuthService) {
    this.baseUrl = baseUrl;
}



  getPaises(): Observable<any> {
    return this.http.get(`${this.baseUrl}${this.api}/get_paises`);
  }

}
