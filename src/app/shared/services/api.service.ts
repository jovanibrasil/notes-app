import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Notebook } from '../../notes/model/notebook';
import { Note } from '../../notes/model/note';
import { Observable } from 'rxjs';
import { FeedbackViewModel } from '../../feedback/feedback.component';
import { User } from '../../auth/model/user';
import { environment } from 'src/environments/environment';
import { ResponseWrapper } from '../services/response-wrapper';
import { PARAMETERS } from '@angular/core/src/util/decorators';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private BASE_URL = environment.NOTES_BASE_URL; 
    
    private SEND_FEEDBACK_URL = `${this.BASE_URL}/feedbacks`;
    
    public ALL_NOTEBOOKS_URL = `${this.BASE_URL}/notebooks`;
    private DELETE_NOTEBOOK = `${this.BASE_URL}/notebooks/`;
    private SAVE_UPDATE_NOTEBOOK = `${this.BASE_URL}/notebooks`;
    
    private ALL_NOTES_URL = `${this.BASE_URL}/notes`;
    private DELETE_NOTE = `${this.BASE_URL}/notes/`;
    private SAVE_UPDATE_NOTE = `${this.BASE_URL}/notes`
    private NOTES_BY_NOTEBOOK_URL = `${this.BASE_URL}/notebooks/`;
    
    private NOTE_COLORS_URL = `${this.BASE_URL}/colorpallet`;

    constructor(private http: HttpClient) {}

    // Notebook functions

    postNotebook(notebook: Notebook): Observable<ResponseWrapper> {
        return this.http.post<ResponseWrapper>(this.SAVE_UPDATE_NOTEBOOK, notebook);
    }

    updateNotebook(notebook: Notebook): Observable<ResponseWrapper>{
        return this.http.put<ResponseWrapper>(this.SAVE_UPDATE_NOTEBOOK, notebook);
    }

    deleteNotebook(id: number): Observable<any> {
        return this.http.delete(this.DELETE_NOTEBOOK + id);
    }

    getAllNotebooks(): Observable<ResponseWrapper> {
        return this.http.get<ResponseWrapper>(this.ALL_NOTEBOOKS_URL);
    }

    // Note functions

    saveNote(note: Note): Observable<ResponseWrapper>{
        return this.http.post<ResponseWrapper>(this.SAVE_UPDATE_NOTE, note);
    }

    updateNote(note: Note): Observable<ResponseWrapper>{
        return this.http.put<ResponseWrapper>(this.SAVE_UPDATE_NOTE, note);
    }

    deleteNote(id: number){
        return this.http.delete(this.DELETE_NOTE + id);
    }

    getAllNotes(page: number): Observable<ResponseWrapper> {
        const params = new HttpParams()
            .append('page', page.toString());
        return this.http.get<ResponseWrapper>(this.ALL_NOTES_URL, { params });
    }

    getNotesByNotebook(id: number): Observable<ResponseWrapper> {
        return this.http.get<ResponseWrapper>(this.NOTES_BY_NOTEBOOK_URL + id + "/notes");
    }

    // Feedback functions
    postFeedback(feedback: FeedbackViewModel, recapchaValue: string): Observable<any> {
        return this.http.post(this.SEND_FEEDBACK_URL, feedback, 
            { params: { recapchaValue } });
    }

    // Saved colors
    getSavedColors(): Observable<ResponseWrapper>{
        return this.http.get<ResponseWrapper>(this.NOTE_COLORS_URL);
    }

    saveColors(colors: string[]) : Observable<ResponseWrapper>{
        return this.http.post<ResponseWrapper>(this.NOTE_COLORS_URL, colors);
    }

}