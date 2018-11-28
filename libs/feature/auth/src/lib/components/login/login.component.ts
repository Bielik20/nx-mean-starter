import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Login } from '@nx-mean-starter/models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Input() loginForm: FormGroup;
  @Input() pending: boolean;
  @Output() login = new EventEmitter<Login>();

  constructor() {}

  ngOnInit() {}
}
