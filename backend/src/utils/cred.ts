import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { DecodedToken } from "../types/type"


export async function handleHashedPassword(password: string): Promise<string> {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Failed to hash password');
  }
}

export async function handleComparePassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  try {
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
  } catch (error) {
    console.error('Error comparing passwords:', error);
    throw new Error('Failed to compare passwords');
  }
}

export async function handleGenerateToken({
  userId,
  username,
  roles
}: DecodedToken): Promise<string> {
  try {
    const token = jwt.sign({ userId, username, roles }, process.env.SECRET_KEY!, {
      expiresIn: '7d'
    });
    return token;
  } catch (error) {
    console.error('Error generating token:', error);
    throw new Error('Failed to generate token');
  }
}

export async function handleVerifyToken(
  token: string
): Promise<DecodedToken | null> {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as DecodedToken;
    return decoded;
  } catch (error) {
    console.error('Error verifying token:', error);
    return null;
  }
}
