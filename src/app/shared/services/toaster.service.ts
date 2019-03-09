import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { IToast, ToastTypeEnum } from '../../toaster/itoast';

/*
  This service is responsable for connecting the angular components to the toast component 
  that displays notification messages.
*/

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private subject: Subject<IToast> = new Subject<IToast>();
  private lastToast: IToast = null;

  constructor(private router: Router) {}

  getToast(): Observable<any> {
    return this.subject.asObservable();
  }

  success(message, keepAfterRouteChange = false) {
    this.toast(message, ToastTypeEnum.Success, keepAfterRouteChange);
  }
  error(message, keepAfterRouteChange = false) {
    this.toast(message, ToastTypeEnum.Error, keepAfterRouteChange);
  }
  info(message: string, keepAfterRouteChange = false) {
    this.toast(message, ToastTypeEnum.Info, keepAfterRouteChange);
  }
  warn(message: string, keepAfterRouteChange = false) {
    this.toast(message, ToastTypeEnum.Warning, keepAfterRouteChange);
  }

  toast(message: string, type: ToastTypeEnum, keepAfterRouteChange = false) {
    let toast = <IToast>{ message: message, type};
    this.subject.next(toast);
    if(keepAfterRouteChange){
      this.lastToast = toast;
    }
  }

  loadRoutedToast(){
    let toast = this.lastToast;
    if(toast){
      this.lastToast = null;
      this.subject.next(toast);
    }
  }

  /*
    Remove toast.
  */
  clear(){
    this.subject.next();
  }

}
