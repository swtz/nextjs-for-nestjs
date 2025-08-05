import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const loginExpSeconds = Number(process.env.LOGIN_EXPIRATION_SECONDS) || 86400;
const loginCookieName = process.env.LOGIN_COOKIE_NAME || 'loginSession';

export async function hashPassword(password: string) {
  const hash = await bcrypt.hash(password, 10);
  const base64 = Buffer.from(hash).toString('base64');
  return base64;
}

export async function verifyPassword(password: string, base64Hash: string) {
  const hash = Buffer.from(base64Hash, 'base64').toString('utf-8');
  const isValid = await bcrypt.compare(password, hash);
  return isValid;
}

export async function createLoginSessionFromApi(jwt: string) {
  const expiresAt = new Date(Date.now() + loginExpSeconds * 1000);
  const loginSession = jwt;
  const cookieStore = await cookies();

  cookieStore.set(loginCookieName, loginSession, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expiresAt,
  });
}

export async function getLoginSessionForApi() {
  const cookieSession = await cookies();

  const jwt = cookieSession.get(loginCookieName)?.value;

  if (!jwt) return false;

  return jwt;
}

export async function requireLoginSessionOrRedirectForApi() {
  const isAuthenticated = await getLoginSessionForApi();

  if (!isAuthenticated) {
    redirect('/login');
  }
}

export async function deleteLoginSession() {
  const cookieStore = await cookies();
  cookieStore.set(loginCookieName, '', { expires: new Date(0) });
  cookieStore.delete(loginCookieName);
}
