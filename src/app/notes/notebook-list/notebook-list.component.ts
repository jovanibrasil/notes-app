import { Component, OnInit, Input } from '@angular/core';
import { Notebook } from '../model/notebook';

@Component({
  selector: 'app-notebook-list',
  templateUrl: './notebook-list.component.html',
  styleUrls: ['./notebook-list.component.css']
})
export class NotebookListComponent implements OnInit {

  @Input() notebooks: Notebook[] = [];
  
  /**
   * Functions
   */
  @Input() selectNotebook: Function;
  @Input() updateNotebook: Function;
  @Input() deleteNotebook: Function;
  @Input() checkNotebookDeletingStatus: Function;
  @Input() findNotes: Function;

  constructor() { }

  ngOnInit() {
  }

}
