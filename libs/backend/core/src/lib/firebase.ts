import { environment } from '@env/backend';
import * as admin from 'firebase-admin';

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(environment.firebase as any),
  databaseURL: `https://${environment.firebase.project_id}.firebaseio.com`,
});
