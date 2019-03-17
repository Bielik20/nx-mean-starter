import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-sidenav-card',
  templateUrl: './user-sidenav-card.component.html',
  styleUrls: ['./user-sidenav-card.component.scss'],
})
export class UserSidenavCardComponent implements OnInit {
  @Input() name: string;
  @Input() pictureUrl: string;

  constructor() {}

  ngOnInit() {}
}
