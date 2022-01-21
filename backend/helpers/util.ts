import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const createToken = (user) => {
  // Sign the JWT
  if (!user.role) {
    throw new Error('No user role specified');
  }
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      iss: 'api.mercado',
      aud: 'api.mercado'
    },
    process.env.JWT_SECRET,
    { algorithm: 'HS256', expiresIn: '1h' }
  );
};

const hashPassword = async (password: string) => {
  return await new Promise((resolve, reject) => {
    // Generate a salt at level 12 strength
     bcrypt.genSalt(12, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

const verifyPassword = (
  passwordAttempt: string,
  hashedPassword: string
) => {
  return bcrypt.compare(passwordAttempt, hashedPassword);
};

const requireAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: 'There was a problem authorizing the request'
    });
  }
  if (req.user.role !== 'admin') {
    return res
      .status(401)
      .json({ message: 'Insufficient role' });
  }
  next();
};

export {
  createToken,
  hashPassword,
  verifyPassword,
  requireAdmin
};
