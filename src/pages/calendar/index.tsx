"use client";

import "@/app/globals.css";
import { Header } from "@/components";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, {
  Draggable,
  DropArg,
} from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";

import { Event } from "@/models/Event";
import { useState } from "react";

function CalendarPage() {
  const [events, setEvents] = useState<Event[]>([
    {
      description: "Teste",
      title: "Teste",
      startTime: new Date(),
      endTime: new Date(),
      allDay: false,
      id: 1,
      userId: 1,
    },
    {
      description: "Teste",
      title: "Teste",
      startTime: new Date(),
      endTime: new Date(),
      allDay: false,
      id: 2,
      userId: 1,
    },
    {
      description: "Teste",
      title: "Teste",
      startTime: new Date(),
      endTime: new Date(),
      allDay: false,
      id: 3,
      userId: 1,
    },
    {
      description: "Teste",
      title: "Teste",
      startTime: new Date(),
      endTime: new Date(),
      allDay: false,
      id: 4,
      userId: 1,
    },
    {
      description: "Teste",
      title: "Teste",
      startTime: new Date(),
      endTime: new Date(),
      allDay: false,
      id: 5,
      userId: 1,
    },
    {
      description: "Teste",
      title: "Teste",
      startTime: new Date(),
      endTime: new Date(),
      allDay: false,
      id: 6,
      userId: 1,
    },
  ]);
  const [allEvents, setAllEvents] = useState<Event[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [idToDelete, setIdToDelete] = useState<number | null>(0);
  const [newEvent, setNewEvent] = useState<Event>({
    description: "",
    title: "",
    startTime: new Date(),
    endTime: new Date(),
    allDay: false,
    id: 0,
    userId: 0,
  });

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
              events={{}}
              nowIndicator={true}
              editable={true}
              droppable={true}
              selectable={true}
              selectMirror={true}
              // dateClick={{}}
              // drop={{}}
              // eventClick={{}}
            />
          </div>
        </div>
        <div id="draggable-el" className="bg-primary w-1/6 border-2">
          <h1 className="text-lg font-bold">Eventos</h1>
          {events.map((event) => (
            <div
              className="bg-white border-2 border-black fc-event"
              draggable="true"
              id={String(event.id)}
              key={event.id}
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
