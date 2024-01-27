import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export const handleLogin = async (email: string, password: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const getAllUsers = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

export const getUserById = async (id: number) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
};

export const createUser = async (data: User) => {
  return await prisma.user.create({
    data,
  });
};

export const updateUser = async (id: number, data: User) => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
  });
};

export const deleteUser = async (id: number) => {
  await prisma.event.deleteMany({
    where: {
      creatorId: id,
    },
  });

  return await prisma.user.delete({
    where: {
      id,
    },
  });
};
