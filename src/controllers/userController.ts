import { NextApiRequest, NextApiResponse } from "next";
import * as userService from "@/services/userService";

export const getAllUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const user = await userService.getUserById(Number(req.query.id));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getUserByEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const user = await userService.getUserByEmail(String(req.body.email));
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userExist = await userService.getUserByEmail(req.body.email);
    if (userExist) {
      return res.status(409).json({ message: "User already exists" });
    }
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userExist = await userService.getUserById(Number(req.query.id));
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    const emailInUse = await userService.getUserByEmail(req.body.email);
    if (emailInUse) {
      return res.status(409).json({ message: "Email already in use" });
    }
    const user = await userService.updateUser(Number(req.query.id), req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userExist = await userService.getUserById(Number(req.query.id));
    if (!userExist) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("req.query.id", req.query.id);
    await userService.deleteUser(Number(req.query.id));
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
