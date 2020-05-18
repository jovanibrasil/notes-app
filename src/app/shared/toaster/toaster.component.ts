import { Component, OnInit, Input } from '@angular/core';
import { IToast } from './itoast';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.css']
})
export class ToasterComponent implements OnInit {

  toasts: IToast[] = [];

  constructor(private toasterService: ToasterService) { }

  ngOnInit() {
    this.toasterService.getToast().subscribe((toast: IToast) => {
      if (!toast) {
        this.toasts = [];
        return;
       }
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast), toast.timer);
    });
    // load toast throwed by the previous component. Only
    // routing persistent toasts can be returned by the function.
    this.toasterService.loadRoutedToast();
  }

  removeToast(toast: IToast): void{
    this.toasts = this.toasts.filter(x => x !== toast);
  }

}
