import { getErrorMessage } from "./errors";
import { Event, EventInBack } from "@/models/Event";
import api from "./index";

export const createEvent = async (data: EventInBack) => {
  try {
    const response = await api.post("/events", data);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return getErrorMessage(error);
  }
};

export const getEventsByUserId = async (userId: string) => {
  try {
    const response = await api.get(`/events/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return getErrorMessage(error);
  }
};

export const deleteEventById = async (id: string) => {
  try {
    const response = await api.delete(`/events/${id}`);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return getErrorMessage(error);
  }
};

export const editEvent = async (data: EventInBack) => {
  try {
    const response = await api.put(`/events`, data);
    return response.data;
  } catch (error) {
    console.error("error", error);
    return getErrorMessage(error);
  }
};
