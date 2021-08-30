import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ShopSettings } from '../models/shopSettings';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  loaderActive: boolean = false;
  loaderSub = new BehaviorSubject<boolean>(this.loaderActive);

  pageTitle: string = 'Home';
  pageTitleSub = new BehaviorSubject<string>(this.pageTitle);

  
  shopSettings: ShopSettings[] = [];
  shopSettingsSub = new BehaviorSubject<ShopSettings[]>(this.shopSettings);


  constructor() { }

  setActiveShopSettings(shopSettings: ShopSettings[]) {
    this.shopSettingsSub.next(shopSettings);
  }

  getActiveShopSettings(): Observable<ShopSettings[]> {
    return this.shopSettingsSub.asObservable();
  }

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
