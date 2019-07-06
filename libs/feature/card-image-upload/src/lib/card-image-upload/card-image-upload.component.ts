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
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

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
  @ViewChild('fileInput', { static: true }) fileInput: ElementRef;

  isPending$ = new BehaviorSubject<boolean>(false);
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
    const task: AngularFireUploadTask = this.storage.upload(path, file);

    this.isPending$.next(true);
    this.snapshot$ = task.snapshotChanges().pipe(
      finalize(async () => {
        const metadata = await ref.getMetadata().toPromise();

        this.pictureUrl = metadata.fullPath;
        this.pictureUrlChange.emit(metadata.fullPath);
      }),
      catchError(err => {
        this.isPending$.next(false);
        console.error(err);
        return of();
      }),
    );
  }

  loaded() {
    this.isPending$.next(false);
  }
}
