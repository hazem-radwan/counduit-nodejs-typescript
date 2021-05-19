import { genSalt, hash, compare } from "bcryptjs";
import { User } from "../entities/User";
import { sign, verify } from "jsonwebtoken";
import { StrObject } from "../types";
export const sanitizeUser = (user: User) => {
  let { email, username, bio, image } = user;
  return { email, username, bio, image };
};
export async function hashPassword(password: string): Promise<string> {
  let salt: string = await genSalt(8);
  let hashedPassword: string = await hash(password, salt);
  return hashedPassword;
}

export const getDecodedPassword = async function (
  hasedPassword: string,
  providedPassword: string
): Promise<boolean> {
  return await compare(providedPassword, hasedPassword);
};
export const generateToken = (payload: StrObject, signture: string): string => {
  const token = sign(payload, signture, { expiresIn: 60 * 10 * 1000 });
  return token;
};

export const getTokenPayload = function (token: string): StrObject {
  const payload = <StrObject>verify(token, <string>process.env.JWT_SECRET);
  return payload;
};
