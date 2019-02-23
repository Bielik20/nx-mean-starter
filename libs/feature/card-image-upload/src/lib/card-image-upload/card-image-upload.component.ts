import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FileDropEvent } from 'file-drop-element';

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

  uploadFile(fileDropEvent: FileDropEvent) {
    const [file] = fileDropEvent.files;
    console.log(file);
  }
}
