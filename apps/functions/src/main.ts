import { firebase } from '@nx-mean-starter/backend/core';
import { spawn } from 'child-process-promise';
import * as functions from 'firebase-functions';
import * as mkdirp from 'mkdirp-promise';
import * as os from 'os';
import * as path from 'path';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

export const cdnTest = functions.https.onRequest((request, response) => {
  // 31556926 = 1 year
  // max-age - is a browser cache
  // s-maxage - is a cdn cache
  response.set('Cache-Control', 'public, max-age=30, s-maxage=31556926');
  response.send(`${Date.now()}`);
});

// Max height and width of the thumbnail in pixels.
const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
// Thumbnail prefix added to file names.
const THUMB_PREFIX = 'thumb_';

export const image = functions.https.onRequest(async (request, response) => {
  const fullPath = request.params[0];

  const storage = firebase.storage();
  const file = storage.bucket('test').file('1561813747350_test-aaa.jpg');

  const filePath = file.name;
  const fileDir = path.dirname(filePath);
  const fileName = path.basename(filePath);

  const thumbFilePath = path.normalize(path.join(fileDir, `${THUMB_PREFIX}${fileName}`));
  const tempLocalFile = path.join(os.tmpdir(), filePath);
  const tempLocalDir = path.dirname(tempLocalFile);
  const tempLocalThumbFile = path.join(os.tmpdir(), thumbFilePath);

  await mkdirp(tempLocalDir);
  // await file.download({destination: tempLocalFile});

  await response.send(tempLocalFile);
});

// export const server = functions.https.onRequest(app);
