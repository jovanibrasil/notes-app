import { Component, OnInit, HostListener } from '@angular/core';
import { Notebook } from './model/notebook';
import { Note } from './model/note';
import { ApiService } from '../shared/services/api.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime  } from 'rxjs/operators';
import { ToasterService } from '../shared/services/toaster.service';
import { not } from '@angular/compiler/src/output/output_ast';

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
  presetColors: string[] = [];

  oldColor: string = "#aa1ebc";

  constructor(private apiService: ApiService, private toasterService: ToasterService) { }

  ngOnInit() {
    this.getAllNotebooks();
    this.getAllNotes();
    this.selectedNotebook = null;
    this.selectedNote = null;
    // this.searchText.pipe(
    //   debounceTime(5000) // interval of time that events related with the content change will happen 
    // );
    //this.searchText.next(" ");
    this.apiService.getSavedColors().subscribe(
      res => {
        this.presetColors = res.data as string[];
        if(this.presetColors.length == 0){
          this.presetColors = ['#fff', '#000', '#2889e9',
          '#e920e9', '#fff500', 'rgb(236,64,64)'];
        }   
      },
      err => { this.toasterService.error("An error has occured setting your saved colors."); }
    );
  }

  public colorPickerOpen(color: string){
    this.selectedNote.backgroundColor = color;
  }

  public presetColorsChange(event: string[]){
    this.apiService.saveColors(event).subscribe(
      res => { this.toasterService.success("Color successfully saved."); },
      err => { this.toasterService.error("An error has occured saving your color."); }
    );
  }

  public noteClickEvent(note: Note){
    this.selectedNote = note;
    this.oldColor = this.selectedNote.backgroundColor;
  }

  /**
   * 
   * @param value is a RGBA value.
   */
  public noteColorChangeEvent(value: string){
    this.selectedNote.backgroundColor = value; 
  }

  public noteColorDialogClosed(open: boolean){
    if(open){
      this.selectedNote.backgroundColor = this.oldColor;
    }
  }

  public colorPickerSelect(color: string){
    this.updateNote(this.selectedNote);
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
    this.selectedNote = null;
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
    this.selectedNote = null;
    this.selectedNotebook = notebook;
    this.getNotesById(notebook.id);
  }

  public deleteNotebook(notebook: Notebook){
    this.selectedNote = null;
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
    }else{
      this.deletingNotebook = false;
    }
  }

  public createNote(){
    this.selectedNote = null;
    this.savingNote = true;
    let note: Note = {
      id: null,
      title: "New Note",
      text: "Write some text here",
      notebookId: this.selectedNotebook.id,
      lastModifiedOn: null,
      backgroundColor: 'rgba(251, 243, 129, 0.74)'
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
    this.selectedNote = null;
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
    }else{
      this.deletingNote = false;
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
