import { ImagePipe } from './image.pipe';

describe('ImagePipe', () => {
  it('create an instance', () => {
    const pipe = new ImagePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return unchanged value', () => {
    const pipe = new ImagePipe();
    const url = 'https://image.png';

    expect(pipe.transform(url)).toEqual(url);
  });

  it('should return full image', () => {
    const pipe = new ImagePipe();
    const url = 'test/image.jpg';
    const result =
      'https://firebasestorage.googleapis.com/v0/b/nx-mean-starter.appspot.com/o/test%2Fimage.jpg?alt=media';

    expect(pipe.transform(url)).toEqual(result);
  });

  it('should return thumbnail image', () => {
    const pipe = new ImagePipe();
    const url = 'test/image.jpg';
    const result =
      'https://firebasestorage.googleapis.com/v0/b/nx-mean-starter.appspot.com/o/test%2Fthumb_image.jpg?alt=media';

    expect(pipe.transform(url, true)).toEqual(result);
  });
});
