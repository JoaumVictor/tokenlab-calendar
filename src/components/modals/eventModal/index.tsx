import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Event } from "@/models/Event";
import { getFormattedDate } from "@/util/shared";
import AuthContext from "@/context";
import CustomModal from "../customModal";

interface ModalProps {
  eventOn: Event | null;
  setEventOn: React.Dispatch<React.SetStateAction<Event | null>>;
  isOpen: boolean;
  onClose: () => void;
  draggableEvents: Event[];
  setDraggableEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  calendarEvents: Event[];
  setCalendarEvents: React.Dispatch<React.SetStateAction<Event[]>>;
}

const EventModal: React.FC<ModalProps> = ({
  eventOn,
  setEventOn,
  isOpen,
  onClose,
  calendarEvents,
  setCalendarEvents,
}) => {
  const { user } = useContext(AuthContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const findEventOn = calendarEvents.find((event) => event.id === eventOn?.id);

  const handleDelete = () => {
    if (!findEventOn) return;

    const newCalendarEvents = calendarEvents.filter(
      (event) => event.id !== findEventOn.id
    );
    setCalendarEvents(newCalendarEvents);

    setShowDeleteModal(false);
    onClose();
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          setEventOn(null);
          onClose();
        }}
      >
        <div className="flex items-center justify-center h-screen w-full pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="flex items-start flex-col justify-between bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all max-w-2xl mt-[10%] gap-3 p-4 mx-auto">
              <span className="font-bold text-end text-slate-500 text-[14px] mb-2 w-full">
                ID: {eventOn?.id}
              </span>
              <span className="w-full text-center font-bold text-2xl">
                Evento
              </span>
              <span className="font-bold">
                Titulo: {findEventOn?.title && findEventOn?.title}
              </span>
              <span className="font-bold">
                Descrição: {findEventOn?.extendedProps?.description}
              </span>
              {findEventOn?.start && (
                <>
                  {!findEventOn.allDay && (
                    <div className="flex items-center justify-start gap-3">
                      <span className="font-bold py-1 px-2 rounded-[4px] text-[18px] bg-primary text-white">
                        Horário de inicio:{" "}
                        {getFormattedDate(findEventOn?.start, "hour")}
                      </span>
                      <span className="font-bold py-1 px-2 rounded-[4px] text-[18px] bg-primary text-white">
                        Horário de fim:{" "}
                        {findEventOn?.extendedProps?.end
                          ? getFormattedDate(
                              findEventOn?.extendedProps?.end,
                              "hour"
                            )
                          : "Não definido"}
                      </span>
                    </div>
                  )}

                  <span className="font-bold">
                    Data: {getFormattedDate(findEventOn?.start, "completeDay")}
                    {findEventOn?.extendedProps?.end &&
                      getFormattedDate(
                        findEventOn?.extendedProps?.end,
                        "completeDay"
                      ) !==
                        getFormattedDate(findEventOn?.start, "completeDay") &&
                      `- ${getFormattedDate(
                        findEventOn?.extendedProps?.end,
                        "completeDay",
                        true
                      )}`}
                  </span>
                </>
              )}
              <span className="font-bold">Criador: {user?.name}</span>
              <span className="font-bold text-gray-300">
                Participantes: ...
              </span>
              <span className="font-bold text-gray-300">Links: ...</span>
              <span className="font-bold text-gray-300">Tags: ...</span>
              <div className="flex items-center justify-start mt-6">
                {findEventOn?.allDay && (
                  <span className="bg-yellow-400 p-3 rounded-[8px] text-[12px] font-bold">
                    Esse evento irá durar o dia todo
                  </span>
                )}
              </div>
              <div className="py-3 px-6 flex w-full items-center justify-end">
                <button
                  type="button"
                  className="font-bold w-full inline-flex justify-center rounded-md border border-transparent shadow-sm border-red-500 hover:bg-red-500 hover:text-white transform transition-all px-4 py-2 text-base text-red-500 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setShowDeleteModal(true)}
                >
                  Apagar evento
                </button>
                <button
                  type="button"
                  className="font-bold mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Fechar
                </button>
              </div>
              <CustomModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Apagar evento"
                message="Tem certeza que deseja apagar esse evento do calendário?"
                type="error"
                onConfirm={handleDelete}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EventModal;
