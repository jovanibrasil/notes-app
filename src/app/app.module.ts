import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotesComponent } from './notes/notes.component';
import { Router, Routes, RouterModule } from '@angular/router';
import { config } from 'rxjs';

const appRoutes: Routes = [
  { 
    path: 'notes', 
    component: NotesComponent 
  },
  { 
    path: 'feedback', 
    component: FeedbackComponent 
  },
  {
    path: '',
    component: NotesComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent, NavigationComponent, FeedbackComponent, NotFoundComponent, NotesComponent
  ],
  imports: [
    BrowserModule, RouterModule.forRoot(appRoutes, {enableTracing: true})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
