import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../../notes/model/note';

@Pipe({
  name: 'noteSearchFilter'
})
export class NoteSearchFilterPipe implements PipeTransform {

  transform(notes: Note[], searchText: string): Note[] {
    if(searchText == null || searchText.trim() == ""){
      return notes;
    } 
    return notes.filter(note => 
      note.title.includes(searchText) || note.text.includes(searchText)
    );
  }

}
