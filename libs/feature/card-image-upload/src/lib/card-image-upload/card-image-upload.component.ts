import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-card-image-upload',
  templateUrl: './card-image-upload.component.html',
  styleUrls: ['./card-image-upload.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardImageUploadComponent implements OnInit {
  @Input() pictureUrl: string;
  @Output() pictureUrlChange = new EventEmitter<string>();
  @ViewChild('fileInput') fileInput: ElementRef;

  task: AngularFireUploadTask;
  percentage$: Observable<number>;
  snapshot$: Observable<any>;

  constructor(private storage: AngularFireStorage) {}

  ngOnInit() {}

  browse() {
    this.fileInput.nativeElement.click();
  }

  uploadFile(files: FileList) {
    const [file] = Array.from(files);

    if (file.type.split('/')[0] !== 'image') {
      console.error(`unsupported file type ${file.type}`);
      return;
    }

    const path = `test/${Date.now()}_${file.name}`;
    const ref = this.storage.ref(path);

    this.task = this.storage.upload(path, file);
    this.percentage$ = this.task.percentageChanges();
    this.snapshot$ = this.task.snapshotChanges().pipe(
      finalize(async () => {
        const url = await ref.getDownloadURL().toPromise();

        this.pictureUrl = url;
        this.pictureUrlChange.emit(url);

        console.log({ file, path, url });
      }),
    );
  }

  isActive(snapshot) {
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }
}
