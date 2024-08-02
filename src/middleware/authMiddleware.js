import { admin } from "../config/auth.js";

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  } 

  const idToken = authHeader.split('Bearer ')[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error verifying Firebase ID token:', error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    const { user } = req;
    if (user && user.role === role) {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
    }
  };
};

export { authMiddleware, checkRole };
