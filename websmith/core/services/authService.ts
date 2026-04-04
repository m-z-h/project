import API from "./apiService";

export const login = async (email: string, password: string) => {
  const res = await API.post("/auth/login", { email, password });
  return res.data;
};

export const register = async (name: string, email: string, password: string) => {
  const res = await API.post("/auth/register", { name, email, password });
  return res.data;
};

export const verifyOtp = async (email: string, otp: string) => {
  const res = await API.post("/auth/verify-otp", { email, otp });

  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};

export const resendOtp = async (email: string) => {
  const res = await API.post("/auth/resend-otp", { email });
  return res.data;
};