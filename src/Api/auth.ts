import axiosInstance from "./axiosInstance";

// Register a user
export const register = async (data: { name: string; email: string; password: string }) => {
  const response = await axiosInstance.post("/register", data);
  return response.data;
};

// Login user
export const login = async (email: string, password: string) => {
  const response = await axiosInstance.post("/login", {
    email,
    password,
    device_name: "Desktop",
  });
  return response.data;
};

// Get current authenticated user
export const getMe = async (token: string) => {
  const response = await axiosInstance.get("/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Change password
export const changePassword = async (token: string, data: { old_password: string; new_password: string }) => {
  const response = await axiosInstance.post("/change-password", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Logout user
export const logout = async (token: string) => {
  const response = await axiosInstance.post("/logout", {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
