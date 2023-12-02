import { randomBytes } from "crypto";

export function generateRandomAlphanumericKey(length: number = 8): string {
  return randomBytes(length).toString('hex').toUpperCase().slice(0, length);
}