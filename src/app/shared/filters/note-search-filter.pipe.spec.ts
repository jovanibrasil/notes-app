import { NoteSearchFilterPipe } from './note-search-filter.pipe';
import { Note } from '../../notes/model/note'

let notes: Note[] = [ 
  {noteId: 1, title: "title1", text: "text1", notebookId: 10, lastModifiedOn: "" },
  {noteId: 2, title: "title2", text: "text2", notebookId: 10, lastModifiedOn: "" }  
];

describe('NoteSearchFilterPipe', () => {
  it('create an instance', () => {
    // Create an instance of the class that we want to test
    const pipe = new NoteSearchFilterPipe();
    // Test if pipe was created successfuly
    expect(pipe).toBeTruthy();
  });

  it('should not filter notes based on search text', () => {
    // arrange
    let pipe = new NoteSearchFilterPipe();
    let emptySearchText = "";  
    // act
    let filteredNotes = pipe.transform(notes, emptySearchText);
    // assert
    expect(filteredNotes.length).toBe(2);
  });

  it('', () => {
    let pipe = new NoteSearchFilterPipe();
    let emptySearchText = "text2";
    let filteredNotes = pipe.transform(notes, emptySearchText);
    expect(filteredNotes.length).toBe(1);
    expect(filteredNotes[0].noteId).toBe(2);
  });

});
