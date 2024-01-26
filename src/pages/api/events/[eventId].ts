import { NextApiRequest, NextApiResponse } from "next";
import * as eventController from "@/controllers/eventController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { eventId } = req.query;
  try {
    switch (req.method) {
      case "GET":
        await eventController.getEventsByUserId(req, res);
        break;

      case "DELETE":
        await eventController.deleteEvent(req, res);
        break;

      default:
        res.status(405).json({ message: "Method not allowed" });
        break;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
