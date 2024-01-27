import { getErrorMessage } from "./errors";
import api from "./index";

export const handleLogin = async (email: string, password: string) => {
  try {
    const response = await api.post("/user/login", { email, password });
    return response.data;
  } catch (error) {
    console.error("error", error);
    return getErrorMessage(error);
  }
};
