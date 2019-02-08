import { Component, OnInit, Input } from '@angular/core';
import { IToast } from './itoast';
import { ToasterService } from '../shared/services/toaster.service';

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
        console.log("toast list vazia")
        this.toasts = [];
        return;
       }
      this.toasts.push(toast);
      console.log("adicionou toast: ", toast.message)
      setTimeout(() => this.removeToast(toast), 3000);
    });
    // load toast throwed by the previous component. Only
    // routing persistent toasts can be returned by the function.
    this.toasterService.loadRoutedToast();
  }

  removeToast(toast: IToast): void{
    this.toasts = this.toasts.filter(x => x !== toast);
  }

}
