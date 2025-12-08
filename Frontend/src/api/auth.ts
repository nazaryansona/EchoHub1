import api from "./ApiClient";

export const signupUser = async (
  password: string,
  color: string,
  emoji: string
) => {
  const res = await api.post("/auth/signup", { password, color, emoji });
  return res.data; // { username }
};

export const previewUsername = async (emoji: string) => {
  const res = await api.post("/auth/preview-username", { emoji });
  return res.data;
};

export const loginUser = async (username: string, password: string) => {
  const res = await api.post("/auth/login", { username, password });
  return res.data;
};

export const logoutUser = async () => {
  const res = await api.post("/auth/logout");
  return res.data;
};
