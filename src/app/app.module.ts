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
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoteComponent } from './notes/note/note.component';
import { NoteSearchFilterPipe } from './shared/note-search-filter.pipe';
import { LoginComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthInterceptor } from './auth/auth.interceptor';

import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
  { path: 'notes', component: NotesComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent },
  { path: 'feedback', component: FeedbackComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, NavigationComponent, FeedbackComponent, NotFoundComponent, NotesComponent,
     NoteComponent, NoteSearchFilterPipe, LoginComponent, SignupComponent
  ],
  imports: [
    FormsModule, BrowserModule, HttpClientModule, RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
