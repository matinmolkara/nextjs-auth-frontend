import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secretKey = new TextEncoder().encode(process.env.SESSION_SECRET);

export async function createSession(userId) {
  const token = await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .sign(secretKey);
  cookies().set("session", token, { httpOnly: true, secure: true, path: "/" });
}

export async function getSession() {
  const session = cookies().get("session");
  if (!session) return null;
  try {
    const { payload } = await jwtVerify(session.value, secretKey);
    return payload;
  } catch {
    return null;
  }
}
