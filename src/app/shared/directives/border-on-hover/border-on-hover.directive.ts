import { Directive, ElementRef, HostListener, Renderer } from '@angular/core';

@Directive({
    selector: '[appBorderOnHover]'
})
export class BorderOnHoverDirective {

    constructor(private el: ElementRef, private render: Renderer) {}

    @HostListener('mouseover')
    borderOn(){
        this.render.setElementStyle(this.el.nativeElement, 'border', '2px solid black');
    }

    @HostListener('mouseleave')
    borderOff(){    
        this.render.setElementStyle(this.el.nativeElement, 'border', '0px groove black');
    }

}