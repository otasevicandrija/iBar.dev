import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  loaderActive: boolean = false;
  loaderSub = new BehaviorSubject<boolean>(this.loaderActive);

  pageTitle: string = 'Home';
  pageTitleSub = new BehaviorSubject<string>(this.pageTitle);


  constructor() { }

  setLoader(isActive: boolean) {
    this.loaderSub.next(isActive);
  }

  getLoader(): Observable<boolean> {
    return this.loaderSub.asObservable();
  }

  setPageTitle(pgTitle: string) {
    this.pageTitleSub.next(pgTitle);
  }

  getPageTitle(): Observable<string> {
    return this.pageTitleSub.asObservable();
  }
}
