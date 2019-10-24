import { Component, OnInit } from '@angular/core';
import { Notebook } from './model/notebook';
import { Note } from './model/note';
import { ApiService } from '../shared/services/api.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime  } from 'rxjs/operators';
import { ToasterService } from '../shared/services/toaster.service';

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
  selectedNote: Note;
  
  deletingNotebook:boolean = false;
  deletingNote:boolean = false;

  savingNote:boolean = false;
  savingNotebook:boolean = false;

  loadingNotes:boolean = false;

  constructor(private apiService: ApiService, private toasterService: ToasterService) { }


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
      res => { this.notebooks = res.data as Notebook[]; } ,
      err => { this.toasterService.error("An error has occured getting all your notebooks."); }
    );
  }

  public getAllNotes(){
    this.notes = [];
    this.loadingNotes = true;
    this.apiService.getAllNotes().subscribe(
      ret => { 
        this.notes = ret.data as Note[]; 
        this.loadingNotes = false;
      },
      err => { 
        this.toasterService.error("An error has occured when getting all the notes."); 
        this.loadingNotes = false;
      }
    );
  }

  public getNotesById(id: number){
    this.notes = [];
    this.loadingNotes = true;
    this.apiService.getNotesByNotebook(id).subscribe(
      ret => { 
        this.notes = ret.data as Note[]; 
        this.loadingNotes = false;
      },
      err => { 
        this.toasterService.error("An error has occured getting a note.");
        this.loadingNotes = false;
      }
    );
  }

  public createNotebook(){
    this.savingNotebook = true;
    let notebook: Notebook = {
      id: 0,
      name:"New notebook",
      numberOfNotes: 2
    };
    this.apiService.postNotebook(notebook).subscribe(
      res => {
        let receivedNotebook = res.data as Notebook;
        notebook.id = receivedNotebook.id;
        this.notebooks.push(notebook);
        this.toasterService.success("Notebook created successfully.");
        this.savingNotebook = false;
      },
      err => { 
        this.toasterService.error("An error has occured when creating the notebook."); 
        this.savingNotebook = false;
      }
    );
  }

  public updateNotebook(notebook: Notebook){
    this.apiService.updateNotebook(notebook).subscribe(
      res => {},
      err => { this.toasterService.error("An error has occured when updating the notebook."); }
    );
  }

  public selectNotebook(notebook: Notebook){
    this.selectedNotebook = notebook;
    this.getNotesById(notebook.id);
  }

  public deleteNotebook(notebook: Notebook){
    if(confirm("Are you sure you want to delete this notebook?")){
      this.deletingNotebook = true;
      this.apiService.deleteNotebook(notebook.id).subscribe(
        res => {
          let indexOfNotebook = this.notebooks.indexOf(notebook);
          this.notebooks.splice(indexOfNotebook, 1);
          this.toasterService.success("Notebook deleted successfully.");
          this.deletingNotebook = false;
          this.selectedNotebook = null;
        }, 
        err => { 
          this.toasterService.error("An error has occured. Could not delete this notebook."); 
          this.deletingNotebook = false;
        }
      );
    }
  }

  public createNote(){
    this.savingNote = true;
    let note: Note = {
      id: null,
      title: "New Note",
      text: "Write some text here",
      notebookId: this.selectedNotebook.id,
      lastModifiedOn: null
    }
    this.apiService.saveNote(note).subscribe(
      res => {
        let savedNote = res.data as Note;
        note.id = savedNote.id;
        note.lastModifiedOn = savedNote.lastModifiedOn
        this.notes.push(note);
        this.toasterService.success("Note created successfully.");
        this.savingNote = false;
      },
      err => { 
        this.savingNote = false;
        this.toasterService.error("An error has occured. Could not save the note.");
      }
    );
  }

  public selectAllNotes(){
    this.selectedNotebook = null  
    this.getAllNotes();
  }

  public deleteNote(note: Note){
    this.deletingNote = true;
    if(confirm("Are you sure you want to delete this note?")){
      this.apiService.deleteNote(note.id).subscribe(
        res => {
          let indexOfNote = this.notes.indexOf(note);
          this.notes.splice(indexOfNote, 1);
          this.toasterService.success("Note deleted successfully.");
          this.deletingNote = false;
        },
        err => {
          this.toasterService.error("An error has occured when deleting this note.");
          this.deletingNote = false;
        }
      );
    }
  }

  public updateNote(note: Note){
    this.apiService.updateNote(note).subscribe(
      res => { 
        let savedNote = res.data as Note;
        note.lastModifiedOn = savedNote.lastModifiedOn 
      },
      err => { this.toasterService.error("An error has occured when updating the note."); }
    );
  }

  public checkNotebookDeletingStatus(notebook: Notebook){
    if(this.selectedNotebook == null)
      return false;
    if(this.selectedNotebook.id == notebook.id && this.deletingNotebook
      )
      return true;
    return false;
  }

}
