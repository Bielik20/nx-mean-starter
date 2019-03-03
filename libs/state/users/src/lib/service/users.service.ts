import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@nx-mean-starter/models';
import { flattenObject } from '@nx-mean-starter/shared';
import { QueryParams } from 'api-query-params';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  getMe(): Observable<User> {
    return this.http.get<User>('api/me');
  }

  patchMe(user: Partial<User>): Observable<User> {
    return this.http.patch<User>('api/me', user);
  }

  getOne(id: string): Observable<User> {
    return this.http.get<User>(`api/users/${id}`);
  }

  getBatch(params: QueryParams = {}): Observable<User[]> {
    return this.http.get<User[]>(`api/users`, { params: flattenObject(params) });
  }
}
