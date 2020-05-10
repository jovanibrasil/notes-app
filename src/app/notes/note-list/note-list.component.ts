import { Component, OnInit, Input } from '@angular/core';
import { Note } from '../model/note';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.css']
})
export class NoteListComponent implements OnInit {

  @Input() notes: Note[];
  @Input() updateNote: Function;
  @Input() deleteNote: Function;

  constructor() { }

  ngOnInit() {
  }

}
