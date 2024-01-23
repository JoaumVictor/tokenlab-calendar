import { PrismaClient } from "@prisma/client";
import { Event } from "@/models/Event";

const prisma = new PrismaClient();

export const getAllEvents = async (): Promise<Event[]> => {
  return prisma.event.findMany();
};

export const createEvent = async (eventData: Event): Promise<Event> => {
  return prisma.event.create({ data: eventData });
};
