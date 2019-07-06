import { Pipe, PipeTransform } from '@angular/core';

const BUCKET_URL = 'https://firebasestorage.googleapis.com/v0/b/nx-mean-starter.appspot.com/o/';
const THUMB_PREFIX = 'thumb_';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(value: string, thumbnail = false): string {
    if (typeof value !== 'string' || value.startsWith('http')) {
      return value;
    }

    const arr = value.split('/');
    if (thumbnail) {
      arr[arr.length - 1] = THUMB_PREFIX + arr[arr.length - 1];
    }
    value = arr.join('%2F');

    return BUCKET_URL + value + '?alt=media';
  }
}
