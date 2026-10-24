export const ADMIN_COOKIE = "jg_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function toBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((value) => { binary += String.fromCharCode(value); });
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(base64);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function credentials() {
  return {
    username: process.env.ADMIN_USERNAME?.trim() || "",
    password: process.env.ADMIN_PASSWORD || "",
    secret: process.env.ADMIN_SESSION_SECRET || "",
  };
}

export function hasAdminConfiguration() {
  const { username, password, secret } = credentials();
  return Boolean(username && password && secret.length >= 32);
}

function secureEqual(left: string, right: string) {
  if (left.length !== right.length) return false;
  let mismatch = 0;
  for (let index = 0; index < left.length; index += 1) mismatch |= left.charCodeAt(index) ^ right.charCodeAt(index);
  return mismatch === 0;
}

async function createSignature(payload: string) {
  const { secret } = credentials();
  if (!secret) return "";
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(payload));
  return toBase64Url(new Uint8Array(signature));
}

export function requestOrigin(request: Request) {
  const requestUrl = new URL(request.url);
  const protocol = request.headers.get("x-forwarded-proto") || requestUrl.protocol.replace(":", "");
  const host = request.headers.get("x-forwarded-host") || request.headers.get("host") || requestUrl.host;
  return `${protocol}://${host}`;
}

export async function verifyCredentials(username: string, password: string) {
  const configured = credentials();
  return hasAdminConfiguration() && secureEqual(username, configured.username) && secureEqual(password, configured.password);
}

export async function createSession(username: string) {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `${username}:${expiresAt}`;
  const signature = await createSignature(payload);
  return { value: `${toBase64Url(encoder.encode(payload))}.${signature}`, expiresAt };
}

export async function validateSession(token?: string) {
  if (!token || !hasAdminConfiguration()) return false;
  const [encodedPayload, signature, extra] = token.split(".");
  if (!encodedPayload || !signature || extra) return false;

  try {
    const payload = decoder.decode(fromBase64Url(encodedPayload));
    const [username, expiresAt, extraPayload] = payload.split(":");
    if (!username || !expiresAt || extraPayload || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
    const configured = credentials();
    const expectedSignature = await createSignature(payload);
    return secureEqual(username, configured.username) && secureEqual(signature, expectedSignature);
  } catch {
    return false;
  }
}
