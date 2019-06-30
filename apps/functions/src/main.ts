import * as functions from 'firebase-functions';

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

// export const server = functions.https.onRequest(app);
