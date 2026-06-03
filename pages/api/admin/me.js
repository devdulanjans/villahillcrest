import { getAdminUsername, isAdminAuthenticated } from '../../../lib/admin-auth';

export default function handler(req, res) {
  const isAuth = isAdminAuthenticated(req);
  const username = getAdminUsername(req);

  if (isAuth) {
    return res.status(200).json({ user: { username } });
  }

  return res.status(200).json({ user: null });
}
