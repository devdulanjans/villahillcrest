const AUTH_COOKIE = 'admin_auth';
const USER_COOKIE = 'admin_user';
const AUTH_TTL_SECONDS = 60 * 60 * 12;

function isHttpsRequest(req) {
  const protoHeader = String(req?.headers?.['x-forwarded-proto'] || '').toLowerCase();
  if (protoHeader.includes('https')) {
    return true;
  }

  const host = String(req?.headers?.host || '').toLowerCase();
  return host.startsWith('localhost') || host.startsWith('127.0.0.1') ? false : false;
}

export function parseCookies(req) {
  const cookieHeader = String(req?.headers?.cookie || '');
  if (!cookieHeader) {
    return {};
  }

  return cookieHeader.split(';').reduce((acc, part) => {
    const [rawName, ...rawValueParts] = part.trim().split('=');
    if (!rawName) {
      return acc;
    }

    const rawValue = rawValueParts.join('=');
    acc[rawName] = rawValue ? decodeURIComponent(rawValue) : '';
    return acc;
  }, {});
}

export function isAdminAuthenticated(req) {
  const cookies = parseCookies(req);
  return cookies[AUTH_COOKIE] === '1';
}

export function getAdminUsername(req) {
  const cookies = parseCookies(req);
  return cookies[USER_COOKIE] || 'admin';
}

export function buildAdminLoginCookies(req, username) {
  const base = ['Path=/', 'HttpOnly', 'SameSite=Lax', `Max-Age=${AUTH_TTL_SECONDS}`];

  if (isHttpsRequest(req)) {
    base.push('Secure');
  }

  const attrs = base.join('; ');
  return [
    `${AUTH_COOKIE}=1; ${attrs}`,
    `${USER_COOKIE}=${encodeURIComponent(username)}; ${attrs}`,
  ];
}

export function buildAdminLogoutCookies(req) {
  const base = ['Path=/', 'HttpOnly', 'SameSite=Lax', 'Max-Age=0'];

  if (isHttpsRequest(req)) {
    base.push('Secure');
  }

  const attrs = base.join('; ');
  return [
    `${AUTH_COOKIE}=; ${attrs}`,
    `${USER_COOKIE}=; ${attrs}`,
  ];
}