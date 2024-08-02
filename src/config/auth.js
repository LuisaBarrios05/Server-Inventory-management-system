import admin from "firebase-admin";

admin.initializeApp({
  credential: admin.credential.cert(process.env.ACCOUNT_SERVICE_FIREBASE),
});

export { admin };
