import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { NotesComponent } from './notes/notes.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NoteComponent } from './notes/note/note.component';
import { NoteSearchFilterPipe } from './shared/filters/note-search-filter.pipe';

import { AuthGuard } from './shared/guards/auth.guard';
import { RequestInterceptor } from './shared/interceptors/request.interceptor';
import { ResponseInterceptor } from './shared/interceptors/response.interceptor';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ColorPickerModule } from 'ngx-color-picker';
import { LoadButtonComponent } from './notes/load-button/load-button.component';
import { NoteListComponent } from './notes/note-list/note-list.component';
import { NotebookListComponent } from './notes/notebook-list/notebook-list.component';
import { SearchComponent } from './notes/search/search.component';
import { BorderOnHoverModule } from './shared/directives/border-on-hover/border-on-hover.module';
import { AuthModule } from './auth/auth.module';
import { SignUpComponent } from './auth/signup/signup.component';
import { SignInComponent } from './auth/signin/signin.component';
import { ToasterModule } from './shared/toaster/toaster.module';
import { ConfigurationComponent } from './configuration/configuration.component';
import { ConfigurationModule } from './configuration/configuration.module';

const appRoutes: Routes = [
  { path: 'notes', component: NotesComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignUpComponent },
  { path: 'configuration', component: ConfigurationComponent, canActivate: [AuthGuard] },
  { path: '', component: SignInComponent, pathMatch: 'full' },
  { path: 'login', component: SignInComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent, 
    HeaderComponent, 
    NotFoundComponent, 
    NotesComponent, 
    NoteComponent, 
    NoteSearchFilterPipe,  
    LoadButtonComponent, 
    NoteListComponent, 
    NotebookListComponent,
    SearchComponent
  ],
  imports: [
    ColorPickerModule,
    FormsModule,
    AuthModule, 
    BrowserModule, 
    HttpClientModule, 
    BorderOnHoverModule,
    NgxCaptchaModule,
    ToasterModule,
    ConfigurationModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false})
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true }, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
