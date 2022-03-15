import {

    HttpEvent,
   
    HttpInterceptor,
   
    HttpHandler,
   
    HttpRequest,
   
    HttpResponse,
   
    HttpErrorResponse,
    HttpResponseBase
   
   } from '@angular/common/http';
import { MessageService } from 'primeng/api';
   
   import { Observable, throwError } from 'rxjs';
   
   import { retry, catchError, finalize, tap } from 'rxjs/operators';
import { Injectable } from "@angular/core";
import { SharedService } from './services/shared.service';
   
   
   
   @Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private _messageService: MessageService,
                private _sharedService: SharedService) {}
   
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this._sharedService.setLoader(true);
      return next.handle(request)
   
        .pipe( 
          tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse && event.status === 200) {
              this._sharedService.setLoader(false);
            }
          }),
   
          retry(1),
   
          catchError((error: HttpErrorResponse) => {
   
            let errorMessage = '';
   
            if (error.error instanceof ErrorEvent) {
   
              // client-side error
   
              errorMessage = `Error: ${error.error.message}`;
   
            } else {
   
              // server-side error
   
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
   
            }
            this._messageService.add({severity:'error', summary: 'Oops. Something went wrong', detail: 'Failed Action' + error.error.message});
            this._sharedService.setLoader(false);
            return throwError(errorMessage);
   
          }),
          // finalize(() => this._sharedService.setLoader(false))
   
        )
   
    }
   }