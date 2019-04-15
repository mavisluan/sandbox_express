import { Injectable } from '@angular/core';
import {User} from "../models/User";
// import HttpClient for API call
// Httpheaders --> manage header
import { HttpClient, HttpHeaders } from '@angular/common/http';
// HttpClient return Observable
import {Observable} from "rxjs";

// set header for post request
const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})

export class UserService {
  // API call url
  apiUrl: string = '/api/users';
  // inject HttpClient
  constructor(private http: HttpClient) { }
  // HttpClient return Observable
  // API call--get request
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
  // API call -- post request
  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user, httpOptions);
  }

  updateUser(user: User): Observable<User> {
    const url = `${this.apiUrl}/${user._id}`;

    return this.http.put<User>(url, user, httpOptions);
  }

  removeUser(id: string): Observable<User> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.delete<User>(url, httpOptions);
  }

  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}/${id}`;

    return this.http.get<User>(url);
  }
}
