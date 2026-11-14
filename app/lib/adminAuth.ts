
import { createHmac, timingSafeEqual } from "crypto";

function safeEqual(a: string, b: string) {
  const bufferA = Buffer.from(a);
  const bufferB = Buffer.from(b);

  return (
    bufferA.length === bufferB.length &&
    timingSafeEqual(bufferA, bufferB)
  );
}

function getSignature(expiresAt: number) {
  const secret = process.env.ADMIN_SESSION_SECRET;

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is missing");
  }

  return createHmac("sha256", secret)
    .update(String(expiresAt))
    .digest("hex");
}

export function createAdminToken() {
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000;

  return `${expiresAt}.${getSignature(expiresAt)}`;
}

export function isValidAdminToken(token?: string) {
  if (!token) return false;

  const [expiresText, signature] = token.split(".");
  const expiresAt = Number(expiresText);

  if (!expiresText || !signature || !Number.isSafeInteger(expiresAt)) {
    return false;
  }

  if (expiresAt <= Date.now()) return false;

  return safeEqual(signature, getSignature(expiresAt));
}

export function isValidAdminPassword(password: string) {
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    throw new Error("ADMIN_PASSWORD is missing");
  }

  return safeEqual(password, adminPassword);
}
