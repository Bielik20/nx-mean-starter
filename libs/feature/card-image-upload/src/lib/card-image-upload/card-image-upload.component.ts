import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card-image-upload',
  templateUrl: './card-image-upload.component.html',
  styleUrls: ['./card-image-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CardImageUploadComponent implements OnInit {
  @Input() pictureUrl: string;

  get pictureUrlBypass() {
    return this.sanitizer.bypassSecurityTrustStyle(`url(${this.pictureUrl})`);
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit() {}

  uploadFile(files: FileList) {
    const [file] = Array.from(files);

    if (file.type.split('/')[0] !== 'image') {
      console.error(`unsupported file type ${file.type}`);
      return;
    }

    console.log(file);
  }
}
