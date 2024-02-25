"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Event, EventInBack } from "@/models/Event";
import AuthContext from "../user";
import { createEvent, getEventsByUserId, deleteEventById } from "@/api/events";
import { generateRandomId } from "@/util/shared";

interface EventContextProps {
  eventOnId: string;
  setEventOnId: (id: string) => void;
  loadingCalendarEvents: boolean;
  calendarEvents: Event[];
  updateCalendarEvents: (events: Event[]) => void;
  newEvent: Event;
  setNewEvent: React.Dispatch<React.SetStateAction<Event>>;
  handleDeleteEvent: (id: string) => Promise<void>;
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

  const updateCalendarEvents = (events: Event[]) => {
    setCalendarEvents(events);
  };

  const getAllEventsByUserId = async () => {
    const response = await getEventsByUserId(String(user?.id));
    if (!response.message) {
      setCalendarEvents(response);
    } else {
      window.alert("ERRO AO ATUALIZAR O CALENDÁRIO");
    }
    setLoadingCalendarEvents(false);
  };

  const handleDeleteEvent = async (id: string) => {
    const response = await deleteEventById(id);
    if (response.status === 200) {
      await getAllEventsByUserId();
    } else {
      window.alert("ERRO AO DELETAR EVENTO");
    }
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

  const createNewEvent = async () => {
    const newEventFormatted: EventInBack = {
      start: newEvent.start?.toString() || "",
      title: newEvent.title,
      allDay: newEvent.allDay,
      description: newEvent.extendedProps.description,
      userId: Number(user?.id),
    };
    if (newEvent.extendedProps.end) {
      newEventFormatted.end = newEvent.extendedProps.end.toString();
    }
    const response = await createEvent(newEventFormatted);
    if (!response.message) {
      await getAllEventsByUserId();
      clearNewEvent();
    } else {
      window.alert("ERRO AO CRIAR EVENTO");
    }
  };

  useEffect(() => {
    const request = async () => {
      if (newEvent.title !== "titulo inicial") {
        await createNewEvent();
      }
    };
    request();
  }, [newEvent]);

  useEffect(() => {
    if (user !== null) {
      setLoadingCalendarEvents(true);
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
        handleDeleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};
