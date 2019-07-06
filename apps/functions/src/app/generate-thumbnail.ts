import { firebase } from '@nx-mean-starter/backend/core';
import { spawn } from 'child-process-promise';
import * as functions from 'firebase-functions';
import * as fs from 'fs-extra';
import * as mkdirp from 'mkdirp-promise';
import * as os from 'os';
import * as path from 'path';

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 256;
const THUMB_MAX_WIDTH = 256;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';

export const generateThumbs = functions.storage.object().onFinalize(async object => {
  // File and directory paths.
  const filePath = object.name;
  const contentType = object.contentType; // This is the image MIME type
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);
  const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

  // Exit if this is triggered on a file that is not an image.
  if (!contentType.startsWith('image/')) {
    return console.log('This is not an image.');
  }

  // Exit if the image is already a thumbnail.
  if (fileName.startsWith(THUMB_PREFIX)) {
    return console.log('Already a Thumbnail.');
  }

  // Cloud Storage files.
  const bucket = firebase.storage().bucket(object.bucket);
  const file = bucket.file(filePath);
  const metadata = {
    contentType: contentType,
    'Cache-Control': 'public,max-age=3600',
  };

  // Create the temp directory where the storage file will be downloaded.
  await mkdirp(tempLocalDir);
  // Download file from bucket.
  await file.download({ destination: tempLocalFile });
  console.log('The file has been downloaded to', tempLocalFile);

  // Generate a thumbnail using ImageMagick.
  await spawn(
    'convert',
    [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile],
    { capture: ['stdout', 'stderr'] },
  );
  console.log('Thumbnail created at', tempLocalThumbFile);

  // Uploading the Thumbnail.
  await bucket.upload(tempLocalThumbFile, { destination: thumbFilePath, metadata });
  console.log('Thumbnail uploaded to Storage at', thumbFilePath);

  // Once the image has been uploaded delete the local files to free up disk space.
  fs.unlinkSync(tempLocalFile);
  fs.unlinkSync(tempLocalThumbFile);
});
