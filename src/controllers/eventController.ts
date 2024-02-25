import { NextApiRequest, NextApiResponse } from "next";
import * as eventService from "@/services/eventService";
import * as userService from "@/services/userService";

export const getAllEvents = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const events = await eventService.getAllEvents();
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res
      .status(500)
      .json({ message: "Algo deu errado ao pegar todos os eventos" });
  }
};

export const getEventById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  try {
    const event = await eventService.getEventById(Number(id));
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    return res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      message: "    Algo deu errado ao pegar o evento através do id    ",
    });
  }
};

export const getEventsByUserId = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { eventId } = req.query;
  try {
    const event = await eventService.getEventsByUserId(Number(eventId));
    return res.status(200).json(event);
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      message: "Algo deu errado ao pegar os eventos através do id do usuário",
    });
  }
};

export const updateEvent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const eventData = req.body;
  console.log("objeto que recebi no backend", eventData);
  try {
    const eventByIdExist = await eventService.getEventById(
      Number(eventData.id)
    );
    if (!eventByIdExist) {
      return res.status(404).json({ message: "Event not found" });
    }
    const userByIdExist = await userService.getUserById(
      Number(eventData.userId)
    );
    if (!userByIdExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const event = await eventService.updateEvent(
      Number(eventData.id),
      eventData
    );
    return res.status(200).json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    res
      .status(500)
      .json({ message: "Algo deu errado ao fazer o update do evento" });
  }
};

export const createEvent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const eventData = req.body;
    const event = await eventService.createEvent(eventData);
    return res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Algo deu errado na criação do evento" });
  }
};

export const deleteEvent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  try {
    const eventByIdExist = await eventService.getEventById(Number(id));
    if (!eventByIdExist) {
      return res.status(404).json({ message: "Event not found" });
    }
    await eventService.deleteEvent(Number(id));
    return res
      .status(200)
      .json({ message: "Event deleted successfully", status: 200 });
  } catch (error) {
    console.error("Error deleting event:", error);
    res
      .status(500)
      .json({ message: "Algo  deu errado ao deletar o evento    " });
  }
};
