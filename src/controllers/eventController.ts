// src/controllers/eventController.ts

import { NextApiRequest, NextApiResponse } from "next";
import * as eventService from "@/services/eventService";

export const getAllEvents = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const events = await eventService.getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
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
    res.status(201).json(event);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
