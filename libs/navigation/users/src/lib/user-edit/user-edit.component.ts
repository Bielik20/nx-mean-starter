import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { UsersState } from '@nx-mean-starter/state/users';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit {
  get pictureUrl(): string {
    return this.userForm.get('pictureUrl').value;
  }
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<UsersState.State>) {}

  ngOnInit() {
    this.userForm = this.fb.group({
      name: '',
      pictureUrl: '',
    });
    this.store
      .select(UsersState.getSelectedUser)
      .pipe(
        filter(user => !!user),
        take(1),
      )
      .subscribe((user: User) => {
        this.userForm.patchValue(user);
      });
  }

  save(user: Partial<User>) {
    this.store.dispatch(new UsersState.PatchOne(user));
  }
}
