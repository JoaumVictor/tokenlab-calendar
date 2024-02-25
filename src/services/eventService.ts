import { Event, PrismaClient } from "@prisma/client";
import { Event as EventInFront } from "@/models/Event";

const prisma = new PrismaClient();

interface EventInBack extends Event {
  participantsOnEvents?: {
    userId: number;
  }[];
}

const formatEventType = (event: EventInBack): EventInFront => {
  return {
    title: event.title,
    start: new Date(event.start),
    allDay: event.allDay,
    id: String(event.id),
    extendedProps: {
      description: event.description,
      userId: event.userId,
      end: event.end ? new Date(event.end) : undefined,
    },
    participantsOnEvents:
      event.participantsOnEvents &&
      event.participantsOnEvents.map((p) => p.userId),
  };
};

export const getAllEvents = async (): Promise<EventInFront[]> => {
  const eventsFromDatabase = await prisma.event.findMany();

  const formattedEvents: EventInFront[] =
    eventsFromDatabase.map(formatEventType);

  return formattedEvents;
};

export const getEventsByUserId = async (
  userId: number
): Promise<EventInFront[]> => {
  const events = await prisma.event.findMany({
    where: {
      userId,
    },
  });
  console.log("DEVOLVENDO OS EVENTOS", events);
  const formattedEvents: EventInFront[] = events.map(formatEventType);
  return formattedEvents;
};

export const getEventById = async (
  eventId: number
): Promise<EventInFront | null> => {
  const event = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
    include: {
      participantsOnEvents: true,
    },
  });
  if (!event) return null;
  const formattedEvent: EventInFront = formatEventType(event);
  return formattedEvent;
};

export const updateEvent = async (
  eventId: number,
  eventData: Event
): Promise<EventInFront> => {
  console.log(
    "evento anterior",
    await prisma.event.findUnique({ where: { id: eventId } })
  );
  console.log("evento que recebi no backend", eventData);
  const event = await prisma.event.update({
    where: {
      id: eventId,
    },
    data: eventData,
  });
  const formattedEvent: EventInFront = formatEventType(event);
  console.log("evento atualizado", formattedEvent);

  return formattedEvent;
};

export const createEvent = async (eventData: Event): Promise<Event> => {
  return await prisma.event.create({ data: eventData });
};

export const deleteEvent = async (eventId: number): Promise<Event> => {
  return await prisma.event.delete({
    where: {
      id: eventId,
    },
  });
};
