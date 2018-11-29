import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Login } from '@nx-mean-starter/models';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  @Input() registerForm: FormGroup;
  @Input() pending: boolean;
  @Output() register = new EventEmitter<Login>();

  constructor() {}

  ngOnInit() {}
}
