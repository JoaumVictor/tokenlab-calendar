import { getErrorMessage } from "./errors";
import api from "./index";

export const handleCreateEvent = async (name: string, date: string) => {
  try {
    const response = await api.post("/event", { name, date });
    return response.data;
  } catch (error) {
    console.error("error", error);
    return getErrorMessage(error);
  }
};

export const getEventsByUserId = async (userId: string) => {
  try {
    console.log("userId", userId);
    const response = await api.get(`/events/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return getErrorMessage(error);
  }
};
