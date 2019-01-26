import * as admin from 'firebase-admin';
import { environment } from '../../environments/environment';

export const firebase = admin.initializeApp({
  credential: admin.credential.cert(environment.firebase as any),
  databaseURL: 'https://nx-mean-starter.firebaseio.com',
});
