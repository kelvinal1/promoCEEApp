
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LoadingScreenService } from './loading-screen.service';
import { AuthService } from './auth.service';


@Injectable({
    providedIn: 'root',
})

export class InterceptorService implements HttpInterceptor {



    activeRequests: number = 0;

    skippUrls = ['/authrefresh'];


    constructor(private router: Router, 
        private msg: NzMessageService, 
        private loadingScreenService: LoadingScreenService, 
        private authService: AuthService) { }


    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        const jwtToken: string | null = this.getToken();
    
        const req: HttpRequest<any> = request;
        // Set authorization token in headers for the users.
        
        const headers: any = {
            "Authorization": jwtToken ?? '',
            //'Content-Type': request.headers.get('Content-Type') ?? 'application/json',
        };

        if (request.headers.has('Content-Type')) {
            headers['Content-Type'] = request.headers.get('Content-Type');
        }
        
        //Verify if token is not null set headers.
        if (jwtToken != null) {
            request = req.clone({
                setHeaders: headers,
            });
        }

        return next.handle(request).pipe(
            catchError(error => {
                if (error instanceof HttpErrorResponse) {
                    this.manageError(error);
                }
                return of(error);
            }),
            finalize(() => {
                this.loadingScreenService.loading = false;
            })
        );

    }


    private manageError(error: HttpErrorResponse): void {
        switch (error.status) {
            case 0:
                break;
            case 401:
                //this.router.navigate(['/sign-in']);
                break;
            case 403:
                //this.router.navigate(['/forbidden']);
                break;
        }
        if (error.status !== 0) {
            //this.message.error(this.parseError(error.error.message));
        }
    }

    private getToken(): string | null {
        return environment.token;
    }


    private getTokenLogUser(): string | null  {
        return '';
    }

}