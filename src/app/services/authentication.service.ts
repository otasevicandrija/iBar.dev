import { Injectable } from '@angular/core';
import { UserLogin } from '../models/loginUser';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LoginModel } from '../models/loginInfo';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser = new LoginModel();
  currentUserSubject = new BehaviorSubject<LoginModel>(this.currentUser);

  token = '';
  tokenSub = new BehaviorSubject<string>(this.token);
  
  private headers = new HttpHeaders({
    'Accept': 'application/json',
  });


  constructor(private _http: HttpClient,
              private _router: Router,
              private _messageService: MessageService) {
    // this.currentUserSubject = new BehaviorSubject<any>(localStorage.getItem('currentUser'));
    // this.currentUser = this.currentUserSubject.asObservable();
    // this.setUserPunoIme(localStorage.getItem('currentUser'));
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  getCurrentUserSubject(): Observable<LoginModel> {
    return this.currentUserSubject.asObservable();
  }

  setCurrentUserSubject(user: LoginModel) {
    this.currentUserSubject.next(user);
  }

  getCurrentTokenSubject(): Observable<string> {
    return this.tokenSub.asObservable();
  }

  setCurrentTokenSubject(token: string) {
    this.tokenSub.next(token);
  }

  login(userLogin: UserLogin): Observable<any> {
    const url = environment.apiURL + 'login';

    return this._http.post<any>(url, userLogin, {headers: this.headers})
      .pipe(map(response => {
        if (response.user && response.token) {
          localStorage.setItem('currentUser', JSON.stringify(response.user.name));
          // localStorage.setItem('apiToken', user[0].data.token)
          this._messageService.add({severity:'success', summary: 'Successful login. ', detail:'Welcome.'});
          return response;
        }
        // } else {
        //   this._messageService.add({severity:'error', summary: 'Doslo je do greske', detail:'Neuspesan login. Molimo proverite vase unose'});
        //   throw new Error('Login Error');          
        // }
      }));
  }

  logout(token: string): Observable<any> {
    const url = environment.apiURL + 'logout'; //--dev
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    // bearer token tbd
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    // localStorage.removeItem('apiToken');
    this.currentUserSubject.next(null);
    // this.setUserPunoIme(null);
    this._router.navigateByUrl('/');
    return this._http.post<any>(url, null, {headers: headers});
  }

  logoutWithoutRouting() {
    localStorage.removeItem('currentUser');
    // bearer token tbd
    // localStorage.removeItem('apiToken');
    // this.setUserPunoIme(null);
    this.currentUserSubject.next(null);
  }

}
