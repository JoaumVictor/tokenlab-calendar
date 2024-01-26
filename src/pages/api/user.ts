import { NextApiRequest, NextApiResponse } from "next";
import * as eventController from "@/controllers/eventController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        await eventController.getAllEvents(req, res);
        break;

      case "POST":
        await eventController.createEvent(req, res);
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
