import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LayoutComponent implements OnInit {
  @Input() isMobile: boolean;
  @Input() showSidenav: boolean;
  @Output() openedChangeSidenav = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit() {}
}
