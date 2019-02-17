import * as admin from 'firebase-admin';
import { environment } from './environment';

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(environment.firebase as any),
  databaseURL: `https://${environment.firebase.project_id}.firebaseio.com`,
});
