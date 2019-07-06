import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'image',
})
export class ImagePipe implements PipeTransform {
  transform(value: string, host?: HTMLElement): string {
    console.log(host);
    console.log(host.offsetHeight, host.offsetWidth);

    return value;
  }
}
