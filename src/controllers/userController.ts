import { NextApiRequest, NextApiResponse } from "next";
import * as userService from "@/services/userService";

export const handleLogin = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const user = await userService.handleLogin(
      req.body.email,
      req.body.password
    );
    if (!user) {
      return res.status(404).json({ message: "Email ou senha incorretos" });
    }
    if (user.password !== req.body.password) {
      return res.status(401).json({ message: "Email ou senha incorretos" });
    }
    return res.status(200).json({
      id: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getAllUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Erro ao buscar usuários:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getUserById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const user = await userService.getUserById(Number(req.query.id));
    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const getUserByEmail = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const user = await userService.getUserByEmail(String(req.query.email));
    if (!user) {
      return res
        .status(404)
        .json({ message: "O e-mail não pertence a nenhuma conta" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userExist = await userService.getUserByEmail(req.body.email);
    if (userExist) {
      return res.status(409).json({ message: "Email já cadastrado" });
    }
    const user = await userService.createUser(req.body);
    return res.status(201).json(user);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const updateUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userExist = await userService.getUserById(Number(req.query.id));
    if (!userExist) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    const emailEmUso = await userService.getUserByEmail(req.body.email);
    if (emailEmUso) {
      return res.status(409).json({ message: "E-mail já em uso" });
    }
    const user = await userService.updateUser(Number(req.query.id), req.body);
    return res.status(200).json(user);
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};

export const deleteUser = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userExist = await userService.getUserById(Number(req.query.id));
    if (!userExist) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }
    await userService.deleteUser(Number(req.query.id));
    return res.status(200).json({ message: "Usuário deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor" });
  }
};
