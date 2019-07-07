import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ImagePipe } from '@nx-mean-starter/shared';

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

  get pictureUrlBypass() {
    return this.sanitizer.bypassSecurityTrustStyle(
      `url("${this.imagePipe.transform(this.pictureUrl, this.thumbnail)}")`,
    );
  }

  constructor(private sanitizer: DomSanitizer, private imagePipe: ImagePipe) {}

  ngOnInit() {}
}
