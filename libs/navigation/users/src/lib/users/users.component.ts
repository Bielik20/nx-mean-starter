import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { UsersState } from '@nx-mean-starter/state/users';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  users$: Observable<User[]>;

  constructor(private store: Store<UsersState.State>) {}

  ngOnInit() {
    this.users$ = this.store.select(UsersState.getEntitiesArray);
  }

  getUsers() {
    this.store.dispatch(new UsersState.LoadAll());
  }
}
