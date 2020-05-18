import { NgModule } from '@angular/core';
import { ToasterComponent } from './toaster.component';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [ ToasterComponent ],
    imports: [ CommonModule ],
    exports: [ ToasterComponent ]
})
export class ToasterModule {

}