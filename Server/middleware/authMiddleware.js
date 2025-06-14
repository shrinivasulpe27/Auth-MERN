import { verifyToken } from '../utils/generateToken.js';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;                     // "Bearer <token>"
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Not authorized, no token' });
    }

    const token = auth.split(' ')[1];
    const decoded = verifyToken(token);

    req.user = await User.findById(decoded.id).select('-password'); // attach user (sans password)
    if (!req.user) throw new Error('User not found');

    next();
  } catch (err) {
    res.status(401).json({ error: 'Token invalid or expired' });
  }
};
