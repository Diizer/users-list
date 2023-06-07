import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './models/user';

@Injectable()
export class UsersApi {
  constructor(private http: HttpClient) {}
  getAll(): Observable<User[]> {
    const url = `https://jsonplaceholder.typicode.com/users`;

    return this.http.get<User[]>(url);
  }

  getUserDetails(id: number): Observable<User> {
    const url = `https://jsonplaceholder.typicode.com/users/${id}`;

    return this.http.get<User>(url);
  }
}
