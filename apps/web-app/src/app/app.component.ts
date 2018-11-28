import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { User } from '@nx-mean-starter/models';
import { RootState } from '@nx-mean-starter/state/root';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  user$: Observable<User>;

  constructor(private store: Store<RootState.State>) {}

  ngOnInit() {
    this.user$ = this.store.pipe(select(RootState.getAuthenticatedUser));
  }
}
