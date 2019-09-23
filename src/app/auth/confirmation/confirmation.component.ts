import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Timer } from 'src/app/toaster/itoast';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private toasterService:ToasterService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {}

  ngAfterViewInit(){
    this.verifyTokenInformation();
  }

  sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if ((new Date().getTime() - start) > milliseconds){
        break;
      }
    }
  }

  verifyTokenInformation(){
    let token: string = this.route.snapshot.queryParamMap.get('token');
    if(token){
      // if the token is present, wait server verification response     
      this.authService.verifyRegistrationToken(token).subscribe(
        res => {
          this.sleep(50000);
          this.toasterService.success("Confirmed! Please, login with your credentials.", true, Timer.Long);
          this.router.navigate(['/']);
        },
        err => { 
          this.sleep(50000);
          this.toasterService.error("Error! Please, contact the support.", true, Timer.Long);
          this.router.navigate(['/']);  
        }
      );
    }else{
      // token is not present
      // show a spinner by five seconds
      this.toasterService.error("Error! Invalid token. Please, contact the support.", true, Timer.Long);
      this.router.navigate(['/']);  
    }
  }

}
