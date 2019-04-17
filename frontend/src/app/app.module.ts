import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
// import FormsModule for inject data
import {FormsModule} from '@angular/forms';
import { PostsComponent } from './components/posts/posts.component';
// import for API call
import {HttpClientModule} from '@angular/common/http';
import { PostFormComponent } from './components/post-form/post-form.component';
import {UserService} from './services/user.service';
import {PostService} from './services/post.service';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {UserFormComponent} from "./components/user-form/user-form.component";

@NgModule({
  declarations: [
    AppComponent,
    UserFormComponent,
    UsersComponent,
    NavbarComponent,
    PostsComponent,
    PostFormComponent,
    HomeComponent,
    PostComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    // import for API call
    HttpClientModule,
    AppRoutingModule
  ],
  // inject Services into provider
  providers: [UserService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
