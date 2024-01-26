import { NextApiRequest, NextApiResponse } from "next";
import * as eventService from "@/services/eventService";

export const getAllEvents = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const events = await eventService.getAllEvents();
    return res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(500).json({ message: "Internal Server Error" });
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateEvent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const eventData = req.body;
  try {
    const eventByIdExist = await eventService.getEventById(
      Number(eventData.id)
    );
    if (!eventByIdExist) {
      return res.status(404).json({ message: "Event not found" });
    }
    const event = await eventService.updateEvent(
      Number(eventData.id),
      eventData
    );
    return res.status(200).json(event);
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createEvent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const eventData = req.body;
    const event = await eventService.createEvent(eventData);
    const eventIdExist = await eventService.getEventById(Number(event.id));
    if (eventIdExist) {
      return res.status(409).json({ message: "Event id already exists" });
    }
    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteEvent = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { eventId } = req.query;
  try {
    const eventByIdExist = await eventService.getEventById(Number(eventId));
    if (!eventByIdExist) {
      return res.status(404).json({ message: "Event not found" });
    }
    await eventService.deleteEvent(Number(eventId));
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
