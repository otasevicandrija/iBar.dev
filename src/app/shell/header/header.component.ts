import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserLogin } from 'src/app/models/loginUser';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/services/shared.service';
import { LoginModel } from 'src/app/models/loginInfo';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  mobMenuSidebar: boolean;
  mobUserSidebar: boolean;

  userActive: boolean = false;

  returnUrl: string;

  submitted: boolean = false;

  loading: boolean = false;

  loginSubscription: Subscription;
  
  isPasswordBad: boolean = false;
  isUsernameBad: boolean = false;

  error: string = '';
  userLoginInfo: UserLogin;
  currentActiveUser: string = '';

  userModel: LoginModel;

  userEmailDisplaySub: Subscription;
  
  blocked: boolean;
  isLoggedIn: boolean = false;
  currentUserSub: Subscription;

  number: number[] = [];
  title: string = '';

  pageTitleSub: Subscription;

  token: string = '';
  tokenSub: Subscription;

  constructor(private _authService: AuthenticationService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _messageService: MessageService,
              private _sharedService: SharedService) { }

  ngOnInit() {
    this.userModel = new LoginModel();
    // this.isLoggedIn = true;
    this._authService.getCurrentUserSubject()
      .subscribe(x => {
        console.log('curr user: ' + JSON.stringify(x));
        if (x && x.id && x.name) {
          this.isLoggedIn = true;
          this.userModel = x;
          this.currentActiveUser = x.name;
        } else {
          this.userActive = false;
        }
      });
    
    this.userLoginInfo = new UserLogin();

    
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  

    this.tokenSub = this._authService.getCurrentTokenSubject()
      .subscribe(t => {
        this.token = t;
      });

      this.pageTitleSub = this._sharedService.getPageTitle()
        .subscribe(x => {
          this.title = x;
        });
        
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    if (this.loginSubscription) {
      this.loginSubscription.unsubscribe();
    }

    if (this.userEmailDisplaySub) {
      this.userEmailDisplaySub.unsubscribe();
    }

    if (this.currentUserSub) {
      this.currentUserSub.unsubscribe();
    }

    if(this.pageTitleSub) {
      this.pageTitleSub.unsubscribe();
    }

    if(this.tokenSub) {
      this.tokenSub.unsubscribe();
    }
  }


  onSubmit() {

    if (this.userLoginInfo.email && this.userLoginInfo.email.length > 3) {
      this.isUsernameBad = false;
    } else {
      this.isUsernameBad = true;
    }

    if (this.userLoginInfo.password && this.userLoginInfo.password.length > 7) {
      this.isPasswordBad = false;
    } else {
      this.isPasswordBad = true;
    }
    

    
    if (!this.isUsernameBad && !this.isPasswordBad) { 

      this.submitted = true;
      this.loading = true;
      this.loginSubscription = this._authService.login(this.userLoginInfo)
          .pipe(first())
          .subscribe(
              data => {
                this.currentActiveUser = data.data.name;

                // this._authService.setUserPunoIme(data.data.name);
                // this._authService.userPunoIme = this.userLoginInfo.username;
                // this._router.navigateByUrl("/knjige");
                  // this._router.navigate([this.returnUrl]);
                this._authService.setCurrentUserSubject(data);
              },
              error => {
                  this.error = error;
                  this.loading = false;

                  this._messageService.add({severity:'error', summary: 'Doslo je do greske', detail:error.error.error});
              });

    } else {
      this._messageService.add({severity:'error', summary: 'Doslo je do greske', detail:'Molimo vas proverite vase unose i sva obavezna polja.'});
    }

  }

  logout() {
    console.log('resp logout: ' + JSON.stringify(this.token));
    this.isLoggedIn = false;
    this._authService.logout(this.token)
      .subscribe(x => {
        console.log('resp logout: ' + JSON.stringify(x));
      });

    // clear out the object
this.userLoginInfo = new UserLogin(); 
  }

  goHome() {
    if (this.userModel && this.userModel.name.length > 3 && this.isLoggedIn == true) {
        this._router.navigateByUrl("/stats");      
    } else {
      this._router.navigateByUrl("/");
    }
  }

  goToDashboard() {
    this._router.navigateByUrl("/dashboard");
  }

  // goToPopis() {
  //   this._router.navigateByUrl("/popis");
  // }

  // goToBiblioteka() {
  //   this._router.navigateByUrl("/tBiblioteka");
  // }

  // goToStats() {
  //   this._router.navigateByUrl("/informacije");
  // }

  pageTitle() {
    console.log('route: ' + JSON.stringify(this._router.url));
    if (this._router.url == '/stats') {
      this.title = 'Stats';
    }else {
      this.title = 'Home';
    }
  }
  

}
