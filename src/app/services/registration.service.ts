import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { UserRegistration } from '../models/userRegistration';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _httpClient: HttpClient) { }

  register(req: UserRegistration): Observable<any> {
    const url = environment.apiURL + '/registration';

    return this._httpClient.post(url, req)
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
  }

  verification(id: string): Observable<any> {
    const url = environment.apiURL + '/' + id;

    return this._httpClient.get<any>(url);
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
}

  // handleError(error) {

  //   let errorMessage = '';
 
  //   if (error.error instanceof ErrorEvent) {
 
  //     // client-side error
 
  //     errorMessage = `Error: ${error.error.message}`;
 
  //   } else {
 
  //     // server-side error
 
  //     errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
 
  //   }
 
  //   window.alert(errorMessage);
 
  //   return throwError(errorMessage);
 
  // }
}
