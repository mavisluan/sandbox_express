import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Post} from '../models/Post';
import {Observable} from 'rxjs';
// Set header for post request
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
// Services return Observable
export class PostService {
  postsUrl = 'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {
  }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl);
  }

  // Post request needs 'Header'
  savePost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, httpOptions);
  }

  updatePost(post: Post): Observable<Post> {
    const url = `${this.postsUrl}/${post.id}`;

    return this.http.put<Post>(url, post, httpOptions);
  }

  removePost(post: Post | number): Observable<Post> {
    const id = typeof post === 'number' ? post : post.id;
    const url = `${this.postsUrl}/${id}`;

    return this.http.delete<Post>(url, httpOptions);
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;

    return this.http.get<Post>(url);
  }
}
