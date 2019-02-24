import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card-image',
  templateUrl: './card-image.component.html',
  styleUrls: ['./card-image.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardImageComponent implements OnInit {
  @Input() pictureUrl: string;

  get pictureUrlBypass() {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.pictureUrl})`);
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}
}
