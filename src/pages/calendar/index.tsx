"use client";

import "@/app/globals.css";
import { Header } from "@/components";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ptBrLocale from "@fullcalendar/core/locales/pt-br";
import { useContext, useState } from "react";
import {
  EventChangeArg,
  EventClickArg,
  EventSourceInput,
} from "@fullcalendar/core/index.js";
import { Toaster } from "react-hot-toast";
import { EventContext } from "@/context/event";
import CreateEventModal from "@/components/modals/createEventModal";
import { generateRandomId } from "@/util/shared";
import EventModal from "@/components/modals/eventModal";
import { Event } from "@/models/Event";

function CalendarPage() {
  const {
    calendarEvents,
    newEvent,
    setNewEvent,
    setEventOnId,
    updateCalendarEvents,
  } = useContext(EventContext);

  const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
    setOpenModal({ ...openModal, createEvent: true });
    setNewEvent({
      ...newEvent,
      start: arg.date.toISOString(),
      allDay: arg.allDay,
      id: String(generateRandomId()),
    });
  };

  const handleEventClick = ({ event }: EventClickArg) => {
    setEventOnId(event.id);
    setOpenModal({ ...openModal, showEvent: true });
  };

  const handleEventChange = (arg: EventChangeArg) => {
    const myEvent = calendarEvents.find((event) => event.id === arg.event.id);
    if (!myEvent || !arg.event.start) return;
    const updatedEvent: Event = {
      ...myEvent,
      ...arg.event.toJSON(),
      start: arg.event.start.toISOString(),
      allDay: arg.event.allDay,
      extendedProps: {
        ...myEvent?.extendedProps,
        end: arg.event.end?.toISOString(),
      },
    };
    const updatedEvents = calendarEvents.map((event) =>
      event.id === arg.event.id ? updatedEvent : event
    );
    updateCalendarEvents(updatedEvents);
  };

  const [openModal, setOpenModal] = useState({
    createEvent: false,
    editEvent: false,
    showEvent: false,
  });

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
          eventChange={handleEventChange}
          eventClick={handleEventClick}
          dateClick={handleDateClick}
        />
      </main>
      <CreateEventModal
        isOpen={openModal.createEvent}
        onClose={() => setOpenModal({ ...openModal, createEvent: false })}
      />
      <EventModal
        isOpen={openModal.showEvent}
        onClose={() => setOpenModal({ ...openModal, showEvent: false })}
      />
      <Toaster position="top-right" />
    </div>
  );
}

export default CalendarPage;
