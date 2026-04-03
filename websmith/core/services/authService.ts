import API from "./apiService";

export const login = async (email: string, password: string) => {
  const res = await API.post("/auth/login", { email, password });

  // store token
  localStorage.setItem("token", res.data.token);

  return res.data;
};

export const register = async (name: string, email: string, password: string) => {
  const res = await API.post("/auth/register", { name, email, password });
  
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }

  return res.data;
};