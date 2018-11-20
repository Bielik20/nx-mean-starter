import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@nx-mean-starter/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getOne(id: string): Observable<User> {
    return this.http.get<User>(`api/users/${id}`);
  }

  getAll(): Observable<User[]> {
    return this.http.get<User[]>('api/users');
  }
}
