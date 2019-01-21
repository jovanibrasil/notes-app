import { Component, OnInit, Input } from '@angular/core';
import { IToast } from '../shared/itoast';
import { ToasterService } from '../toaster.service';

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
      console.log("adicionou toast: ", toast.message)
      setTimeout(() => this.removeToast(toast), 6000);
    });
  }

  removeToast(toast: IToast): void{
    this.toasts = this.toasts.filter(x => x !== toast);
  }

}
