// lib/auth.ts

import { apiRequest } from "./api";

export const login = async (email: string, password: string) => {
  const response = await apiRequest(
    "https://btt.triumphdigital.co.th/api/auth/login",
    "POST",
    { email, password }
  );

  if (response.status === 1) {
    return response.access_token;
  }

  throw new Error("Login failed");
};
