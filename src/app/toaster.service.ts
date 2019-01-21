import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { IToast, ToastTypeEnum } from './shared/itoast';

/*
  This service is responsable for connecting the angular components to the toast component 
  that displays notification messages.
*/

@Injectable({
  providedIn: 'root'
})
export class ToasterService {

  private subject: Subject<IToast> = new Subject<IToast>();
  private keepAfterRouteChange: boolean = true;

  constructor(private router: Router) {
    router.events.subscribe(event => {
      if(event instanceof NavigationStart){
        if(this.keepAfterRouteChange){
          console.log("mantem lista de toasts")
          this.keepAfterRouteChange = true;
        } else {
          console.log("limpou lista de toasts")
          this.clear();
        }
      }
    });
  }

  getToast(): Observable<any> {
    console.log(this.subject)
    return this.subject.asObservable();
  }

  success(message, keepAfterRouteChange = true) {
    this.toast(message, ToastTypeEnum.Success, keepAfterRouteChange);
  }
  error(message, keepAfterRouteChange = true) {
    this.toast(message, ToastTypeEnum.Error, keepAfterRouteChange);
  }
  info(message: string, keepAfterRouteChange = true) {
    this.toast(message, ToastTypeEnum.Info, keepAfterRouteChange);
  }
  warn(message: string, keepAfterRouteChange = true) {
    this.toast(message, ToastTypeEnum.Warning, keepAfterRouteChange);
  }

  toast(message: string, type: ToastTypeEnum, keepAfterRouteChange = true) {
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.subject.next(<IToast>{ message: message, type});
  }

  clear(){
    console.log("removeu toast")
    this.subject.next();
  }

}
