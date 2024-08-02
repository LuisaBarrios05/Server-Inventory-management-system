//node src/scripts/assignRoles.js
import admin from 'firebase-admin';
import dotenv from 'dotenv';
dotenv.config()
// Inicializa la app de Firebase Admin con tus credenciales
const serviceAccount = process.env.ACCOUNT_SERVICE_FIREBASE

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const assignAdminRole = async (uid) => {
  try {
    await admin.auth().setCustomUserClaims(uid, { "role": "Admin" });
    console.log(`Success! User ${uid} has been granted admin role.`);
  } catch (error) {
    console.error('Error assigning admin role:', error);
  }
};

// Reemplazar para asignar el rol de admin
assignAdminRole('1cFyT81PEwVmx6gNTdSL7vvAcLB2');
