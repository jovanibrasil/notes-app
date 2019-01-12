import { Component, OnInit } from '@angular/core';
import { Notebook } from './model/notebook';
import { Note } from './model/note';
import { ApiService } from '../shared/api.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime  } from 'rxjs/operators';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notebooks: Notebook[] = [];
  notes: Note[] = [];
  //searchText: Subject<string> = new Subject<string>();
  searchText: string;
  selectedNotebook: Notebook;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.selectedNotebook = null;
    // this.searchText.pipe(
    //   debounceTime(5000) // interval of time that events related with the content change will happen 
    // );
    //this.searchText.next(" ");
  }

  public getAllNotebooks(){
    this.apiService.getAllNotebooks().subscribe(
      res => { this.notebooks = res; } ,
      err => {
        alert("An error has occured");
      }
    );
  }

  public getAllNotes(){
    this.apiService.getAllNotes().subscribe(
      ret => { this.notes = ret; },
      err => { alert("An error has occured"); }
    );
  }

  public getNotesById(id: number){
    this.apiService.getNotesByNotebook(id).subscribe(
      ret => { this.notes = ret; },
      err => { alert("An error has occured") }
    );
  }

  public createNotebook(){
    let notebook: Notebook = {
      notebookId: 0,
      name:"New notebook",
      numberOfNotes: 2
    };
    this.apiService.postNotebook(notebook).subscribe(
      res => {
        notebook.notebookId = res.notebookId;
        this.notebooks.push(notebook);
      },
      err => { alert("An error has occured"); }
    );
  }

  public updateNotebook(notebook: Notebook){
    this.apiService.postNotebook(notebook).subscribe(
      res => {},
      err => { alert("An error has occured"); }
    );
  }

  public selectNotebook(notebook: Notebook){
    this.selectedNotebook = notebook;
    this.getNotesById(notebook.notebookId);
  }

  public deleteNotebook(notebook: Notebook){
    
    if(confirm("Are you sure you want to delete this notebook?")){
      this.apiService.deleteNotebook(notebook.notebookId).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
        }, 
        err => { alert("An error has occured. Could not delete notebook."); }
      );
    }
  }

  public createNote(){

    let note: Note = {
      noteId: 0,
      title: "New Note",
      text: "Write some text here",
      notebookId: this.selectedNotebook.notebookId,
      lastModifiedOn: null
    }

    this.apiService.saveNote(note).subscribe(
      res => {
        note.noteId = res.noteId;
        note.lastModifiedOn = res.lastModifiedOn
        this.notes.push(note);
      },
      err => { alert("An error has occured. Could not save the note."); }
    );
  }

  public selectAllNotes(){
    this.selectedNotebook = null  
    this.getAllNotes();
  }

  public deleteNote(note: Note){
    if(confirm("Are you sure you want to delete this note?")){
      this.apiService.deleteNote(note.noteId).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
        },
        err => {}
      );
    }
  }

  public updateNote(note: Note){
    //note.lastModifiedOn = new Date().toString();
    this.apiService.updateNote(note).subscribe(
      res => { note.lastModifiedOn = res.lastModifiedOn },
      err => { alert("An error has occured"); }
    );
  }

}
