import admin from "firebase-admin";

if (process.env.ENV === 'prod' || process.env.ENV === ''){
admin.initializeApp({
  credential: admin.credential.applicationDefault()
});} else {
    admin.initializeApp({
        credential: admin.credential.cert(process.env.ACCOUNT_SERVICE_FIREBASE),
      });
}

export { admin };
