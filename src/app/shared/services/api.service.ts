import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { FeedbackViewModel } from '../../feedback/feedback.component';
import { Notebook } from '../../notes/model/notebook';
import { Note } from '../../notes/model/note';
import { Page } from 'src/app/auth/model/page';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private BASE_URL = environment.NOTES_BASE_URL; 
    
    private SEND_FEEDBACK_URL = `${this.BASE_URL}/feedbacks`;
    
    public ALL_NOTEBOOKS_URL = `${this.BASE_URL}/notebooks`;
    private DELETE_NOTEBOOK = `${this.BASE_URL}/notebooks/`;
    private SAVE_NOTEBOOK = `${this.BASE_URL}/notebooks`;
    private UPDATE_NOTEBOOK = `${this.BASE_URL}/notebooks/`;
    
    private ALL_NOTES_URL = `${this.BASE_URL}/notes`;
    private DELETE_NOTE = `${this.BASE_URL}/notes/`;
    private SAVE_NOTE = `${this.BASE_URL}/notes`
    private UPDATE_NOTE = `${this.BASE_URL}/notes/`
    private NOTES_BY_NOTEBOOK_URL = `${this.BASE_URL}/notebooks/`;
    
    private NOTE_COLORS_URL = `${this.BASE_URL}/colorpallets`;

    constructor(private http: HttpClient) {}

    // Notebook functions

    postNotebook(notebook: Notebook): Observable<any> {
        return this.http.post<any>(this.SAVE_NOTEBOOK, 
            notebook, {observe: 'response'});
    }

    updateNotebook(notebook: Notebook): Observable<Notebook>{
        let id = notebook.id;
        notebook.id = null;
        return this.http.put<Notebook>(this.UPDATE_NOTEBOOK + id, notebook);
    }

    deleteNotebook(id: number): Observable<any> {
        return this.http.delete(this.DELETE_NOTEBOOK + id);
    }

    getAllNotebooks(): Observable<Page<Notebook>> {
        return this.http.get<Page<Notebook>>(this.ALL_NOTEBOOKS_URL);
    }

    // Note functions

    saveNote(note: Note): Observable<any>{
        note.id = null;
        note.lastModifiedOn = null;
        return this.http.post<any>(this.SAVE_NOTE, note, { observe: 'response' });
    }

    updateNote(note: Note): Observable<Note>{
        let id = note.id;
        note.id = null;
        note.lastModifiedOn = null;
        return this.http.put<Note>(this.UPDATE_NOTE + id, note);
    }

    deleteNote(id: number){
        return this.http.delete(this.DELETE_NOTE + id);
    }

    getAllNotes(page: number): Observable<Page<Note>> {
        const params = new HttpParams()
            .append('page', page.toString());
        return this.http.get<Page<Note>>(this.ALL_NOTES_URL, { params });
    }

    getNotesByNotebook(id: number): Observable<Page<Note>> {
        return this.http.get<Page<Note>>(this.NOTES_BY_NOTEBOOK_URL + id + "/notes");
    }

    // Feedback functions
    postFeedback(feedback: FeedbackViewModel, recapchaValue: string): Observable<any> {
        return this.http.post(this.SEND_FEEDBACK_URL, feedback, 
            { params: { recapchaValue } });
    }

    // Saved colors
    getSavedColors(): Observable<string[]>{
        return this.http.get<string[]>(this.NOTE_COLORS_URL);
    }

    saveColors(colors: string[]) : Observable<string[]>{
        return this.http.post<string[]>(this.NOTE_COLORS_URL, colors);
    }

}