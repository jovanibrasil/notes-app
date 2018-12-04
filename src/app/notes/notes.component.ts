import { Component, OnInit } from '@angular/core';
import { Notebook } from './model/notebook';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
  }

  public getAllNotebooks(){
    let url = "http://localhost:8082/api/notebooks/all";

    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      } ,
      err => {
        alert("An error has occured");
      }
    );

  }

}
