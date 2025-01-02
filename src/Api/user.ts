// lib/user.ts

import { apiRequest } from "./api";

export const getCurrentUser = async (token: string) => {
  const response = await apiRequest(
    "https://btt.triumphdigital.co.th/api/auth/me",
    "GET",
    null,
    token
  );
  return response;
};
