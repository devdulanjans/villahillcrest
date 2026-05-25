export default function handler(req, res) {
  const cookie = req.headers.cookie || '';
  const isAuth = cookie.includes('admin_auth=1');

  const userMatch = cookie.match(/(?:^|;\s*)admin_user=([^;]+)/);
  const username = userMatch ? decodeURIComponent(userMatch[1]) : 'admin';

  if (isAuth) {
    return res.status(200).json({ user: { username } });
  }

  return res.status(200).json({ user: null });
}
