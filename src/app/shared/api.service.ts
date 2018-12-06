import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notebook } from '../notes/model/notebook';
import { Note } from '../notes/model/note';
import { Observable } from 'rxjs';
import { FeedbackViewModel } from '../feedback/feedback.component';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private BASE_URL = "http://localhost:8080/api"; 
    
    private SEND_FEEDBACK_URL = `${this.BASE_URL}/feedback`;
    
    private ALL_NOTEBOOKS_URL = `${this.BASE_URL}/notebook/all`;
    private DELETE_NOTEBOOK = `${this.BASE_URL}/notebook/`;
    private SAVE_UPDATE_NOTEBOOK = `${this.BASE_URL}/notebook`;
    private ALL_NOTES_URL = `${this.BASE_URL}/note/all`;
    
    private NOTES_BY_NOTEBOOK_URL = `${this.BASE_URL}/note/byNotebook/`;
    private SAVE_UPDATE_NOTE = `${this.BASE_URL}/notes`
    private DELETE_NOTE = `${this.BASE_URL}/note/`;

    constructor(private http: HttpClient) {}

    getAllNotebooks(): Observable<Notebook[]> {
        return this.http.get<Notebook[]>(this.ALL_NOTEBOOKS_URL);
    }

    getAllNotes(): Observable<Note[]> {
        return this.http.get<Note[]>(this.ALL_NOTES_URL);
    }

    getNotesByNotebook(id: number): Observable<Note[]> {
        return this.http.get<Note[]>(this.NOTES_BY_NOTEBOOK_URL + id);
    }

    postFeedback(feedback: FeedbackViewModel): Observable<any> {
        return this.http.post(this.SEND_FEEDBACK_URL, feedback);
    }

    postNotebook(notebook: Notebook): Observable<Notebook> {
        return this.http.post<Notebook>(this.SAVE_UPDATE_NOTEBOOK, notebook);
    }

    deleteNotebook(id: number): Observable<any> {
        return this.http.delete(this.DELETE_NOTEBOOK + id);
    }

    saveNote(note: Note): Observable<Note>{
        return this.http.post<Note>(this.SAVE_UPDATE_NOTE, note);
    }

    deleteNote(id: number){
        return this.http.delete(this.DELETE_NOTE + id);
    }

}