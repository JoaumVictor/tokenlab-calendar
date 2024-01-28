"use client";

import "@/app/globals.css";
import { Header, Button } from "@/components";
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
import { classNames, getFormattedDate } from "@/util/shared";
import { getEventsByUserId } from "@/api/events";
import toast, { Toaster } from "react-hot-toast";
import CreateEventModal from "@/components/modals/createEventModal";
import EventModal from "@/components/modals/eventModal";
import ReactLoading from "react-loading";

function CalendarPage() {
  const { user, forceGetUserFromLocalStorage } = useContext(AuthContext);

  const [loadingDraggableEvents, setLoadingDraggableEvents] =
    useState<boolean>(true);
  const [draggableEvents, setDraggableEvents] = useState<Event[]>(
    [] as Event[]
  );

  const [calendarEvents, setCalendarEvents] = useState<Event[]>([] as Event[]);

  const [showCreateEventModal, setShowCreateEventModal] =
    useState<boolean>(false);
  const [localToCreateEvent, setLocalToCreateEvent] =
    useState<string>("draggable");

  const [showEventModal, setShowEventModal] = useState<boolean>(false);
  const [eventOnId, setEventOnId] = useState<number>(0);

  const [newEvent, setNewEvent] = useState<Event>({
    title: "titulo inicial",
    start: null,
    allDay: false,
    id: 0,
    extendedProps: {
      description: "",
      userId: Number(user?.id),
    },
  });

  const [nameOfEventsInCalender, setNameOfEventsInCalender] = useState<
    string[]
  >([]);

  useEffect(() => {
    if (calendarEvents) {
      setNameOfEventsInCalender(
        calendarEvents
          .filter((event) => event.id !== 12345)
          .map((event) => event.title)
      );
    }
  }, [calendarEvents]);

  useEffect(() => {
    console.log("página do calendário carregada");
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

  const clearNewEvent = () => {
    setNewEvent({
      title: "",
      start: null,
      allDay: false,
      id: 0,
      extendedProps: {
        description: "",
        userId: Number(user?.id),
      },
    });
  };

  const dropAndAddEventInCalendar = (data: DropArg) => {
    const newCalendarEvent = {
      start: data.date.toISOString(),
      title: data.draggedEl.title,
      allDay: data.allDay,
      id: new Date().getTime(),
      extendedProps: {
        description: data.draggedEl.dataset.eventDescription as string,
        userId: Number(data.draggedEl.dataset.eventUserId),
      },
    };

    if (calendarEvents && draggableEvents) {
      setCalendarEvents([...calendarEvents, newCalendarEvent]);

      const eventIndexInDraggable = draggableEvents?.findIndex(
        (event) => event.title === newCalendarEvent.title
      );

      const updatedEventsInDraggable = [...draggableEvents];

      updatedEventsInDraggable[eventIndexInDraggable] = newCalendarEvent;

      setDraggableEvents(updatedEventsInDraggable);
    } else {
      setCalendarEvents([newCalendarEvent]);
    }
  };

  useEffect(() => {
    const createEventModalOnConfirm = () => {
      if (localToCreateEvent === "calendar") {
        if (calendarEvents && draggableEvents) {
          setCalendarEvents([...calendarEvents, newEvent]);
          setDraggableEvents([...draggableEvents, newEvent]);
        }
      } else {
        if (draggableEvents) {
          setDraggableEvents([...draggableEvents, newEvent]);
        }
        clearNewEvent();
      }
    };

    if (newEvent.title !== "") {
      createEventModalOnConfirm();
    }
  }, [newEvent]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user !== null) {
      console.log(
        "usuário encontrado, inicia a busca pelos eventos do usuário"
      );
      const getAllEventsByUserId = async () => {
        const response: Event[] = await getEventsByUserId(String(user?.id));
        const responseDraggable = response?.filter((event, index, self) => {
          if (event.id === 12345) {
            return true;
          } else {
            return index === self.findIndex((t) => t.id === event.id);
          }
        });
        if (response) {
          setDraggableEvents(responseDraggable);
          setCalendarEvents(response);
        } else {
          toast.error("Erro ao buscar eventos");
        }
        setTimeout(() => {
          setLoadingDraggableEvents(false);
        }, 500);
      };
      getAllEventsByUserId();
    } else {
      console.log("usuário não encontrado, inicia a busca pelo usuário no LS");
      forceGetUserFromLocalStorage();
    }
  }, [user, forceGetUserFromLocalStorage]);

  const updateEvent = (info: EventChangeArg) => {
    if (info.event.start && calendarEvents && draggableEvents) {
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
      console.log("objeto da lib atualizado", info.event);
      const eventIndexInCalendar = calendarEvents.findIndex(
        (event) => event.id === Number(updatedEvent.id)
      );
      const updatedEventsInCalendar = [...calendarEvents];
      updatedEventsInCalendar[eventIndexInCalendar] = updatedEvent;
      setCalendarEvents(updatedEventsInCalendar);

      const eventIndexInDraggable = draggableEvents?.findIndex(
        (event) => event.id === Number(updatedEvent.id)
      );
      const updatedEventsInDraggable = [...draggableEvents];
      updatedEventsInDraggable[eventIndexInDraggable] = updatedEvent;
      setDraggableEvents(updatedEventsInDraggable);
    }
  };

  const formatDaysInDraggableCard = (title: string) => {
    const result = calendarEvents
      ?.filter((event) => event.title === title)
      .map((event) =>
        event?.start ? getFormattedDate(event?.start, "day") : ""
      )
      .filter((day) => day !== "")
      .sort((a, b) => Number(a) - Number(b));
    if (!result) return "";
    if (result.length === 0) return "";
    return result.length > 1 ? (
      <p className="text-[13px] text-gray-500">
        {`Dias ${result[0]}, ${result[1]} ...`}
      </p>
    ) : (
      <p className="text-[14px] text-gray-500">Dia {result[0]}</p>
    );
  };

  const formatEventTitle = (title: string) =>
    title.length >= 23 ? `${title.slice(0, 23)}...` : title;

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
          drop={(data) => dropAndAddEventInCalendar(data)}
          eventChange={(info) => updateEvent(info)}
          eventClick={(data) => {
            setEventOnId(Number(data.event.id));
            setShowEventModal(true);
          }}
        />
        <div
          id="draggable-el"
          className="bg-primary w-1/6 border-2 rounded-[8px]"
        >
          <h1 className="font-semibold text-center p-3 text-white">Eventos</h1>
          <div className="flex flex-col gap-2 p-2 overflow-y-scroll h-[50vh]">
            {draggableEvents?.length === 0 && (
              <p className="text-center text-slate-50 mt-36">Sem eventos</p>
            )}

            {!loadingDraggableEvents ? (
              draggableEvents?.map((event) => (
                <div
                  className={classNames(
                    "bg-gray-200 rounded-[4px] p-2 fc-event cursor-pointer hover:bg-white",
                    nameOfEventsInCalender.includes(event.title) &&
                      "border-4 border-l-amber-500"
                  )}
                  draggable="true"
                  title={event.title}
                  key={event.id}
                  data-event-user-id={event.extendedProps.userId}
                  data-event-description={event.extendedProps.description}
                >
                  <div className="flex w-full items-center justify-between">
                    <p className="font-semibold text-[16px]">
                      {formatEventTitle(event.title)}
                    </p>
                    {formatDaysInDraggableCard(event.title)}
                  </div>
                  {nameOfEventsInCalender?.includes(event.title) && (
                    <p className="text-[14px] text-gray-500">Na Agenda</p>
                  )}
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 w-full h-full">
                <ReactLoading type="spin" color="#FFF" height={80} width={80} />
                <p className="text-center text-slate-50 font-bold">
                  Carregando...
                </p>
              </div>
            )}
          </div>
          <div className="w-full p-4 flex items-center justify-center">
            <Button
              type="primary"
              label="Adicionar Evento"
              onClick={() => {
                setLocalToCreateEvent("draggable");
                setShowCreateEventModal(true);
              }}
              disabled={false}
              typeButton="button"
            />
          </div>
        </div>
      </main>
      <CreateEventModal
        isOpen={showCreateEventModal}
        onClose={() => setShowCreateEventModal(false)}
        onConfirm={() => setShowCreateEventModal(false)}
        localToCreateEvent={localToCreateEvent}
        newEvent={newEvent}
        setNewEvent={setNewEvent}
        draggableEvents={draggableEvents ? draggableEvents : []}
      />
      <EventModal
        isOpen={showEventModal}
        onClose={() => setShowEventModal(false)}
        eventOnId={eventOnId}
        draggableEvents={draggableEvents ? draggableEvents : []}
        calendarEvents={calendarEvents ? calendarEvents : []}
        setCalendarEvents={setCalendarEvents}
        setDraggableEvents={setDraggableEvents}
      />
      <Toaster position="top-right" />
    </div>
  );
}

export default CalendarPage;
