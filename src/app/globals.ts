import { Injectable } from '@angular/core';

@Injectable()
export class Globals {

    prod: boolean = false;

    private DEV_RECAPTCHA_KEY: string = "";
    private PROD_RECAPTCHA_KEY: string = "";
    
    public RECAPTCHA_KEY: string;

    constructor(){
        if(this.prod){
            this.RECAPTCHA_KEY = this.PROD_RECAPTCHA_KEY;
        }else{
            this.RECAPTCHA_KEY = this.DEV_RECAPTCHA_KEY;
        }
    }

}