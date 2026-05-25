import bcrypt from 'bcryptjs';
import { findAdminByUsername } from '../../../lib/mysql';

// Admin login backed by MySQL table: admin_users(id, username, password).
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const adminUser = await findAdminByUsername(username);

    if (!adminUser) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const storedPassword = String(adminUser.password || '');
    const isBcryptHash =
      storedPassword.startsWith('$2a$') ||
      storedPassword.startsWith('$2b$') ||
      storedPassword.startsWith('$2y$');

    const isValidPassword = isBcryptHash
      ? await bcrypt.compare(password, storedPassword)
      : password === storedPassword;

    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const cookieParts = ['Path=/', 'HttpOnly', 'SameSite=Lax'];
    if (process.env.NODE_ENV === 'production') {
      cookieParts.push('Secure');
    }

    res.setHeader('Set-Cookie', [
      `admin_auth=1; ${cookieParts.join('; ')}`,
      `admin_user=${encodeURIComponent(adminUser.username)}; ${cookieParts.join('; ')}`,
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Admin login failed:', error);
    return res.status(500).json({ success: false, message: 'Server error while logging in' });
  }
}
