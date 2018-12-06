import { Component, OnInit } from '@angular/core';
import { Notebook } from './model/notebook';
import { Note } from './model/note';
import { ApiService } from '../shared/api.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];
  notes: Note[] = [];

  selectedNotebook: Notebook;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
    //this.getAllNotes();
    // this.notebooks = [ 
    //   {id:1, name:"teste1", numberOfNotes: 1}, 
    //   {id:2, name:"teste2", numberOfNotes: 1}, 
    //   {id:3, name:"teste3", numberOfNotes: 1} ]

    // this.notes = [
    //     {id: 1,
    //     title: "simple title",
    //     text: "simple text",
    //     notebookId: 1,
    //     lastModifiedOn: "" },
    //     {id: 2,
    //       title: "I love angular",
    //       text: "simple text",
    //       notebookId: 1,
    //       lastModifiedOn: "" }
    // ]

    this.selectedNotebook = null;
    //this.selectedNotebook = this.notebooks[0];

  }

  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      res => {
        this.notebooks = res;
        //this.selectedNotebook = this.notebooks[0];
      } ,
      err => {
        //alert("An error has occured");
      }
    );
  }

  public getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      ret => { this.notes = ret; },
      err => { }
    );
  }

  public getNotesById(id: string){
    this.apiService.getNotesByNotebook(parseInt(id)).subscribe(
      ret => { this.notes = ret; },
      err => { }
    );
  }

  public createNotebook(){
    let notebook: Notebook = {
      id: 1,
      name:"New notebook",
      numberOfNotes: 2
    };
    this.apiService.postNotebook(notebook).subscribe(
      res => {
        notebook.id = res.id;
        this.notebooks.push(notebook);
      },
      err => {
        alert("An error has occured");
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
    
    if(confirm("Are you sure you want to delete this notebook?")){
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        }, 
        err => {
          alert("An error has occured. Could not delete notebook.");
        }
      );
    }
  }

  public createNote(){

    let note: Note = {
      id: null,
      title: "New Note",
      text: "Write some text here",
      notebookId: this.selectedNotebook.id,
      lastModifiedOn: null 
    }
    this.notes.push(note);
  }

  public selectAllNotes(){
    this.selectedNotebook = null  
    this.getAllNotes();
  }

  public selectNotebook(notebook: Notebook){
    this.selectedNotebook = notebook;
  }

  public deleteNote(note: Note){
    this.apiService.deleteNote(note.id).subscribe(
      res => {
        let indexOfNote = this.notes.indexOf(note);
        this.notes.splice(indexOfNote, 1);
      },
      err => {}
    );
  }

}
