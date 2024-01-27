"use client";

import "@/app/globals.css";
import { Header } from "@/components";
import { Event } from "@/models/Event";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  DateClickArg,
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { useContext, useEffect, useState } from "react";
import AuthContext from "@/context";
import {
  EventChangeArg,
  EventInput,
  EventSourceInput,
} from "@fullcalendar/core/index.js";
import { classNames } from "@/util/shared";
import { getEventsByUserId } from "@/api/events";
import toast from "react-hot-toast";

function CalendarPage() {
  const { user } = useContext(AuthContext);

  const [draggableEvents, setDraggableEvents] = useState<Event[]>();
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([
    {
      title: "Teste 1 - Lavar Roupa",
      start: new Date().toISOString(),
      allDay: false,
      id: Number(new Date()) - 1,
      extendedProps: {
        description: "lorem ipsum dolor sit amet",
        userId: 1,
      },
    },
  ]);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(0);
  const [newEvent, setNewEvent] = useState<Event>({
    title: "",
    start: new Date(),
    allDay: false,
    id: 0,
    extendedProps: {
      description: "",
      userId: 0,
    },
  });

  const [nameOfEventsInCalender, setNameOfEventsInCalender] = useState<
    string[]
  >([]);

  useEffect(() => {
    setNameOfEventsInCalender(calendarEvents.map((event) => event.title));
    console.log("calendario atualizou", calendarEvents);
  }, [calendarEvents]);

  useEffect(() => {
    if (user) {
      const getAllEventsByUserId = async () => {
        const response = await getEventsByUserId(String(user?.id));
        if (response) {
          setDraggableEvents(response);
          setCalendarEvents(response);
        } else {
          toast.error("Erro ao buscar eventos");
        }
      };
      getAllEventsByUserId();
    }
  }, [user]);

  useEffect(() => {
    const calendarEl = document.getElementById("draggable-el");
    if (calendarEl) {
      new Draggable(calendarEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          const title = eventEl.innerText;
          const start = eventEl.dataset.start;
          const allDay = eventEl.dataset.allDay === "true";
          return {
            title,
            start,
            allDay,
          };
        },
      });
    }
  }, []);

  const addEvent = (data: DropArg) => {
    const newCalendarEvent = {
      start: data.date.toISOString(),
      title: data.draggedEl.innerText,
      allDay: data.allDay,
      id: new Date().getTime(),
      extendedProps: {
        description: data.draggedEl.dataset.eventDescription as string,
        userId: Number(data.draggedEl.dataset.eventUserId),
      },
    };
    setCalendarEvents([...calendarEvents, newCalendarEvent]);
  };

  const updateEvent = (info: EventChangeArg) => {
    if (info.event.start) {
      const updatedEvent = {
        ...info.event.toJSON(),
        title: info.event.title,
        allDay: info.event.allDay,
        id: Number(info.event.id),
        start: info.event.start.toISOString(),
        extendedProps: {
          description: info.event.extendedProps.description,
          userId: info.event.extendedProps.userId,
          end: info.event.end?.toISOString(),
        },
      };
      // console.log("meu objeto atualizado", updatedEvent);
      // console.log("objeto da lib atualizado", info.event);
      const eventIndex = calendarEvents.findIndex(
        (event) => event.id === Number(updatedEvent.id)
      );
      const updatedEvents = [...calendarEvents];
      updatedEvents[eventIndex] = updatedEvent;
      setCalendarEvents(updatedEvents);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-start justify-start gap-5 w-full">
      <Header headerType="default" />
      <main className="flex flex-row items-center justify-center p-24 w-full h-full gap-20">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          locales={[ptBrLocale]}
          locale="pt-br"
          dayHeaderFormat={{ weekday: "narrow" }}
          titleFormat={{ year: "numeric", month: "short", day: "numeric" }}
          events={calendarEvents as EventSourceInput}
          nowIndicator={true}
          editable={true}
          droppable={true}
          selectable={true}
          selectMirror={true}
          drop={(data) => addEvent(data)}
          eventChange={(info) => updateEvent(info)}
          // dateClick={}
          // eventClick={}
        />
        <div
          id="draggable-el"
          className="bg-primary w-1/6 border-2 rounded-[8px]"
        >
          <h1 className="font-semibold text-center p-3 text-white">Eventos</h1>
          <div className="flex flex-col gap-2 p-2 overflow-y-auto min-h-[50vh]">
            {draggableEvents?.map((event) => (
              <div
                className={classNames(
                  "bg-gray-200 rounded-[4px] p-2 fc-event cursor-pointer hover:bg-white",
                  nameOfEventsInCalender.includes(event.title) &&
                    "border-4 border-l-amber-500"
                )}
                draggable="true"
                title={event.title}
                key={event.id}
                data-event-description={event.extendedProps.description}
                data-event-user-id={event.extendedProps.userId}
              >
                <p className="font-semibold text-[16px]">{event.title}</p>
                {nameOfEventsInCalender?.includes(event.title) && (
                  <p className="text-[14px] text-gray-500">Na Agenda</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default CalendarPage;
