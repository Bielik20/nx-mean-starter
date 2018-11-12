import { Component } from '@angular/core';
import { Post } from '@nx-mean-starter/models';
import { PostsService } from '@nx-mean-starter/services';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent {
  posts$: Observable<Post[]>;

  constructor(private dataService: PostsService) {}

  getPosts() {
    this.posts$ = this.dataService.getAll().pipe(shareReplay(1));
  }
}
