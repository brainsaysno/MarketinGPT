import { config } from "dotenv";

export function loadEnv(key: string): string {
  config();
  const value = process.env[key];
  if (value === undefined) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}
