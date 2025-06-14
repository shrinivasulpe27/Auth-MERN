import User from '../models/User.js';
import { signToken } from '../utils/generateToken.js';

/* --------- POST /api/auth/register --------- */
export const register = async (req, res) => {
  const { username, email, password, role } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ error: 'All fields required' });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ error: 'Email already registered' });

  const user = await User.create({ username, email, password, role });
  res.status(201).json({ message: 'Registered', id: user._id });
};

/* --------- POST /api/auth/login --------- */
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password)))
    return res.status(401).json({ error: 'Invalid credentials' });

  const token = signToken(user._id);
  res.json({
    token,
    user: { id: user._id, username: user.username, email: user.email, role: user.role },
  });
};

/* --------- GET /api/auth/me --------- */
export const getMe = (req, res) => {
  // req.user is populated by protect middleware
  res.json({ user: req.user });
};
