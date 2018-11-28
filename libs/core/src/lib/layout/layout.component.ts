import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AuthModalPageComponent } from '@nx-mean-starter/feature/auth';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  auth() {
    this.dialog.open(AuthModalPageComponent);
  }
}
