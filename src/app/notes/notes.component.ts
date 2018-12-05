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
    //this.getAllNotebooks();
    this.notebooks = [ 
      {id:1, name:"teste1", numberOfNotes: 1}, 
      {id:2, name:"teste2", numberOfNotes: 1}, 
      {id:3, name:"teste3", numberOfNotes: 1} ]
  }

  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
      } ,
      err => {
        //alert("An error has occured");
      }
    );
  }

  public createNotebook(){
    let notebook: Notebook = {
      id: 1,
      name:"New notebook",
      numberOfNotes: 2
    };
    this.notebooks.push(notebook);
    this.apiService.postNotebook(notebook).subscribe(
      res => {
        notebook.id = res.id;
        this.notebooks.push(notebook);
      },
      err => {
        //alert("An error has occured");
      }
    );
  }

  public updateNotebook(notebook: Notebook){
    this.apiService.postNotebook(notebook).subscribe(
      res => {},
      err => {
        //alert("An error has occured");
      }
    );
  }

  public deleteNotebook(notebook: Notebook){
    if(confirm("Are you sure you want to delete notebook?")){
      this.apiService.deleteNotebook(""+notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        }, 
        err => {
          //alert("An error has occured. Could not delete notebook.");
        }
      );
    }
  }

}
