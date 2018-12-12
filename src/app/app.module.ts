import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotesComponent } from './notes/notes.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { config } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { NoteComponent } from './notes/note/note.component';
import { NoteSearchFilterPipe } from './shared/note-search-filter.pipe';
import { LoginComponent } from './login/login.component';

const appRoutes: Routes = [
  { path: 'notes', component: NotesComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: '', component: NotesComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, NavigationComponent, FeedbackComponent, NotFoundComponent, NotesComponent,
     NoteComponent, NoteSearchFilterPipe, LoginComponent
  ],
  imports: [
    FormsModule, BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
