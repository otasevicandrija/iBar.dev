import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLogin } from '../models/loginUser';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  returnUrl: string;

  submitted: boolean = false;

  loading: boolean = false;

  error: string = '';
  loginSubscription: Subscription;

  isPasswordBad: boolean = false;
  isUsernameBad: boolean = false;

  token: string = '';
  tokenSub: Subscription;


  userLoginInfo: UserLogin;

  constructor(private _authService: AuthenticationService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _messageService: MessageService) {
    if (this._authService.currentUserValue) {
      this._router.navigate(['/']);
    }
  }

  ngOnInit() {
    //dev purposes - always cleared cache
    localStorage.removeItem('currentUser');
    
    this.userLoginInfo = new UserLogin();
    this.userLoginInfo.device_name = window.navigator.userAgent;

    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    console.log('cc usr: ' + localStorage.getItem('currentUser'));

    if (localStorage.getItem('currentUser') && localStorage.getItem('currentUser').length > 3) {
      this._router.navigateByUrl("/stats");
    } else {
      this._router.navigateByUrl("/");
    }

    this.tokenSub = this._authService.getCurrentTokenSubject()
      .subscribe(t => {
        this.token = t;
      });

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }

    if(this.tokenSub) {
      this.tokenSub.unsubscribe();
    }
  }

  //testing purposes -- comment once you are done with fe development
  onSubmit() {
    this._router.navigateByUrl("/dashboard");
  }

  //ORIGINAL - UNCOMMENT WHEN BE
  // onSubmit() {

  //   this._authService.logoutWithoutRouting();

  //   if (this.userLoginInfo.email && this.userLoginInfo.email.length > 3) {
  //     this.isUsernameBad = false;
  //   } else {
  //     this.isUsernameBad = true;
  //   }

  //   if (this.userLoginInfo.password && this.userLoginInfo.password.length > 7) {
  //     this.isPasswordBad = false;
  //   } else {
  //     this.isPasswordBad = true;
  //   }

  //   if (!this.isUsernameBad && !this.isPasswordBad) {
  //     this.submitted = true;  
  //     this.loading = true;
  //     this.loginSubscription = this._authService.login(this.userLoginInfo)
  //       .pipe(first())
  //       .subscribe(
  //         data => {
  //           // this._router.navigate([this.returnUrl]);
  //           console.log('from login: ' + JSON.stringify(data.user));
  //           this._router.navigateByUrl("/dashboard");
  //           this._authService.setCurrentUserSubject(data.user);
  //           this._authService.setCurrentTokenSubject(data.token);
  //         },
  //         error => {
  //           this.error = error;
  //           this.loading = false;
  //           this._messageService.add({severity:'error', summary: 'Doslo je do greske', detail:error.error.error});
  //         });
  //   } else {
  //     this._messageService.add({severity:'error', summary: 'Doslo je do greske', detail:'Molimo vas proverite vase unose i sva obavezna polja.'});
  //   }

    
  // }

  logout() {
    
    // clear out the object
    this.userLoginInfo = new UserLogin();

    console.log('logout resp: ' + JSON.stringify(this.token));
    this._authService.logout(this.token)
      .subscribe(x => {
        console.log('logout resp: ' + JSON.stringify(x));
      });
  }

}
