import { Pipe, PipeTransform } from '@angular/core';
import { Note } from '../notes/model/note';

@Pipe({
  name: 'noteSearchFilter'
})
export class NoteSearchFilterPipePipe implements PipeTransform {

  transform(notes: Note[], text: string): Note[] {
    if(text == null || text == ""){
      return notes;
    } 
    return notes.filter(n => n.title.includes(text) || n.text.includes(text));
  }

}
