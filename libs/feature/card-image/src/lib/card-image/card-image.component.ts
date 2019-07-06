import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardImageComponent implements OnInit {
  @Input() pictureUrl: string;
  @Input() thumbnail = false;
  @Output() load = new EventEmitter<Event>();

  constructor() {}

  ngOnInit() {}
}
