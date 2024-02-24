"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Event } from "@/models/Event";
import AuthContext from "../user";
import { getEventsByUserId } from "@/api/events";
import { generateRandomId } from "@/util/shared";

interface EventContextProps {
  eventOnId: string;
  setEventOnId: (id: string) => void;
  loadingCalendarEvents: boolean;
  calendarEvents: Event[];
  updateCalendarEvents: (events: Event[]) => void;
  newEvent: Event;
  setNewEvent: React.Dispatch<React.SetStateAction<Event>>;
}

export const EventContext = createContext<EventContextProps>(
  {} as EventContextProps
);

interface EventProviderProps {
  children: React.ReactNode;
}

export const EventProvider = ({ children }: EventProviderProps) => {
  const { user } = useContext(AuthContext);

  const [eventOnId, setEventOnId] = useState("");
  const [loadingCalendarEvents, setLoadingCalendarEvents] =
    useState<boolean>(true);
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "titulo inicial",
    start: null,
    allDay: false,
    id: String(generateRandomId()),
    extendedProps: {
      description: "",
      userId: Number(user?.id),
      end: undefined,
    },
  });

  const formatEventTitle = (title: string) =>
    title.length >= 23 ? `${title.slice(0, 23)}...` : title;

  const updateCalendarEvents = (events: Event[]) => {
    setCalendarEvents(events);
  };

  const clearNewEvent = () => {
    setNewEvent({
      title: "titulo inicial",
      start: null,
      allDay: false,
      id: String(generateRandomId()),
      extendedProps: {
        description: "",
        userId: Number(user?.id),
        end: undefined,
      },
    });
  };

  useEffect(() => {
    if (newEvent.title !== "titulo inicial") {
      setCalendarEvents([...calendarEvents, newEvent]);
      clearNewEvent();
    }
  }, [newEvent]);

  useEffect(() => {
    if (user !== null) {
      setLoadingCalendarEvents(true);
      const getAllEventsByUserId = async () => {
        const response: Event[] = await getEventsByUserId(String(user?.id));
        if (response) setCalendarEvents(response);
        setLoadingCalendarEvents(false);
      };
      getAllEventsByUserId();
    }
  }, [user]);

  return (
    <EventContext.Provider
      value={{
        eventOnId,
        setEventOnId,
        loadingCalendarEvents,
        calendarEvents,
        updateCalendarEvents,
        newEvent,
        setNewEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
