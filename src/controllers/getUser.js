// npm install firebase-admin
//const admin = require('../config/firebase');  Asegúrate de tener configurado Firebase Admin SDK

const getCurrentUser = async (req, res, next) => {
  const authorization = req.headers['authorization'];

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(401).send('Invalid or missing token');
  }

  const token = authorization.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (err) {
    return res.status(401).send(`Invalid token: ${err.message}`);
  }
};

const adminRequired = (req, res, next) => {
  if (!req.user || req.user.role !== 'Admin') {
    return res.status(403).send('Admin privileges required');
  }
  next();
};

module.exports = {
  getCurrentUser,
  adminRequired,
};


