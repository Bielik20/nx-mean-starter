import { Component } from '@angular/core';
import { User } from '@nx-mean-starter/models';
import { UsersService } from '@nx-mean-starter/services';
import { Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent {
  users$: Observable<User[]>;

  constructor(private usersService: UsersService) {}

  getUsers() {
    this.users$ = this.usersService.getAll().pipe(shareReplay(1));
  }
}
