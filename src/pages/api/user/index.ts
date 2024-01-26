import { NextApiRequest, NextApiResponse } from "next";
import * as userController from "@/controllers/userController";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET":
        await userController.getAllUsers(req, res);
        break;

      case "POST":
        await userController.createUser(req, res);
        break;

      case "DELETE":
        await userController.deleteUser(req, res);
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
