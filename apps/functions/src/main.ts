import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

export const cdnTest = functions.https.onRequest((request, response) => {
  response.set('Cache-Control', 'public, max-age=30, s-maxage=31556926'); // 31556926 = 1 year
  response.send(`${Date.now()}`);
});

// export const server = functions.https.onRequest(app);
