import * as admin from 'firebase-admin';

/** Firebase Documentation - Config FIREBASE */
import serviceAccount = require('../keys/serviceAccountKey.json');
const params = serviceAccount as any;

admin.initializeApp({
  credential: admin.credential.cert(params),
  databaseURL: 'https://alfred-cfa0d.firebaseio.com',
});

const auth: admin.auth.Auth = admin.auth();
const db: admin.firestore.Firestore = admin.firestore();

export {auth, db};
