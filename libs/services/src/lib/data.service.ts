import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '@nx-mean-starter/models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getOne(id: string): Observable<Post> {
    return this.http.get<Post>(`api/posts/${id}`);
  }

  getAll(): Observable<Post[]> {
    return this.http.get<Post[]>('api/posts');
  }
}
