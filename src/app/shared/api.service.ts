import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notebook } from '../notes/model/notebook';
import { Observable } from 'rxjs';
import { FeedbackViewModel } from '../feedback/feedback.component';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    private BASE_URL = "http://localhost:8082/api"; 
    private ALL_NOTES_URL = `${this.BASE_URL}\\notebooks\\all`;
    private SEND_FEEDBACK_URL = `${this.BASE_URL}\\feedback`;

    constructor(private http: HttpClient) {}

    getAllNotebooks(): Observable<Notebook[]> {
        this.http.get<Notebook[]>(this.ALL_NOTES_URL).subscribe(
          res => {
            return res;
          } ,
          err => {
            alert("An error has occured");
          }
        );
        return null;
    }

    sendFeedback(feedback: FeedbackViewModel): Observable<any> {
        //alert(this.model.name);
        this.http.post(this.SEND_FEEDBACK_URL, feedback).subscribe(
          res => {
            return res;
          },
          err => {
            alert("An error has occurred while sending feedback");
          }
        );
        return null;
      }

}