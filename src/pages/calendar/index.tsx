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
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import { EventSourceInput } from "@fullcalendar/core/index.js";

const mockedEvents = [
  {
    title: "Teste 1 - Lavar Roupa",
    start: new Date(),
    allDay: false,
    id: 1,
    extendedProps: {
      description: "Lavar roupa",
      userId: 1,
    },
  },
];

function CalendarPage() {
  const [draggableEvents, setDraggableEvents] = useState<Event[]>();
  const [calendarEvents, setCalendarEvents] = useState<Event[]>([]);

  useEffect(() => {
    setDraggableEvents(mockedEvents);
  }, []);

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

  useEffect(() => {
    const calendarEl = document.getElementById("draggable-el");
    if (calendarEl) {
      new Draggable(calendarEl, {
        itemSelector: ".fc-event",
        eventData: function (eventEl) {
          const title = eventEl.innerText;
          const start = eventEl.dataset.start;
          const allDay = eventEl.dataset.allDay === "true";
          const userId = eventEl.dataset.userId;
          const description = eventEl.dataset.description;
          return {
            title,
            start,
            allDay,
            userId,
            description,
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

  return (
    <div className="flex min-h-screen flex-col items-start justify-start gap-5 w-full">
      <Header />
      <main className="flex flex-row min-h-screen items-center justify-center gap-8 p-24 w-full">
        <div className="grid grid-cols-10">
          <div className="col-span-10">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              locales={[ptBrLocale]}
              locale="pt-br"
              events={calendarEvents as EventSourceInput}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              drop={(data) => addEvent(data)}
              // dateClick={}
              // eventClick={}
            />
          </div>
        </div>
        <div id="draggable-el" className="bg-primary w-1/6 border-2">
          <h1 className="text-lg font-bold">Eventos</h1>
          {draggableEvents?.map((event) => (
            <div
              className="bg-white border-2 border-black fc-event"
              draggable="true"
              title={event.title}
              key={event.id}
              data-event-description={event.extendedProps.description}
              data-event-user-id={event.extendedProps.userId}
            >
              {event.title}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default CalendarPage;
