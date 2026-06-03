import { buildAdminLogoutCookies } from '../../../lib/admin-auth';

export default function handler(req, res) {
  if (req.method === 'POST') {
    res.setHeader('Set-Cookie', buildAdminLogoutCookies(req));
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}