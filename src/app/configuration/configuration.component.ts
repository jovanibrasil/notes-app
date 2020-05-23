import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  constructor() {}

  ngOnInit() {}

  closeCard(){
    document.getElementById('collapseOne').classList.remove('show');
  }
  
}
