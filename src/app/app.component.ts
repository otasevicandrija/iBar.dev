import { AfterViewChecked, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from './services/shared.service';
import { PrimeNGConfig } from 'primeng-lts/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy, AfterViewChecked{
  title = 'devPP';
  blocked: boolean = false;
  loaderSubscription: Subscription;

  constructor(private _sharedService: SharedService,
              private primengConfig: PrimeNGConfig,
              private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.loaderSubscription = this._sharedService.getLoader()
      .subscribe(x => {
        this.blocked = x;
      });
  }

  ngOnDestroy() {
    if (this.loaderSubscription) {
      this.loaderSubscription.unsubscribe();
    }
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

}
