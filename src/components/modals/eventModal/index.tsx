import { Fragment, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Event } from "@/models/Event";
import { getFormattedDate } from "@/util/shared";
import AuthContext from "@/context/user";
import CustomModal from "../customModal";
import { EventContext } from "@/context/event";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Input } from "@/components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const { user } = useContext(AuthContext);
  const { calendarEvents, eventOnId, updateCalendarEvents } =
    useContext(EventContext);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  const findShowEvent = calendarEvents.find(
    (event: Event) => event.id === eventOnId
  ) as Event;

  const handleDeleteEvent = () => {
    const updatedEvents = calendarEvents.filter(
      (event: Event) => event.id !== eventOnId
    );
    updateCalendarEvents(updatedEvents);
    setShowDeleteModal(false);
    onClose();
  };

  const formik = useFormik({
    initialValues: {
      title: findShowEvent?.title,
      description: findShowEvent?.extendedProps?.description,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("O título é obrigatório"),
      description: Yup.string().required("A descrição é obrigatória"),
    }),
    onSubmit: async (values) => {
      if (formik.isValid) {
        const updatedEvent: Event = {
          ...findShowEvent,
          title: values.title,
          extendedProps: {
            ...findShowEvent?.extendedProps,
            description: values.description,
          },
        };
        const updatedEvents = calendarEvents.map((event: Event) =>
          event.id === eventOnId ? updatedEvent : event
        );
        updateCalendarEvents(updatedEvents);
        setModalEdit(false);
        formik.touched.title = false;
        formik.touched.description = false;
      }
    },
  });

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          onClose();
          setModalEdit(false);
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
                ID: {findShowEvent?.id}
              </span>
              <span className="w-full text-center font-bold text-2xl">
                Evento
              </span>
              {modalEdit ? (
                <>
                  <div className="flex items-center justify-center w-full flex-col">
                    <Input
                      label="Título"
                      onChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      value={formik.values.title}
                      name="title"
                      error={formik.errors.title}
                      touched={formik.touched.title}
                      placeholder="Título do evento"
                    />
                    <Input
                      label="Descrição"
                      onChange={formik.handleChange}
                      handleBlur={formik.handleBlur}
                      value={formik.values.description}
                      name="description"
                      error={formik.errors.description}
                      touched={formik.touched.description}
                      placeholder="Descrição do evento"
                      className="h-24 text-wrap"
                      type="textarea"
                    />
                  </div>
                  <div className="items-center flex justify-end w-full">
                    <button
                      type="button"
                      className="font-bold w-full inline-flex justify-center rounded-md border border-transparent shadow-sm border-red-500 hover:bg-red-500 hover:text-white transform transition-all px-4 py-2 text-base text-red-500 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setModalEdit(false)}
                    >
                      Cancelar
                    </button>
                    <button
                      type="button"
                      className="font-bold mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => formik.handleSubmit()}
                    >
                      Salvar
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="font-bold">
                    Titulo: {findShowEvent?.title}
                  </span>
                  <span className="font-bold">
                    Descrição: {findShowEvent?.extendedProps?.description}
                  </span>
                </>
              )}
              {!findShowEvent?.allDay && (
                <div className="flex items-center justify-start gap-3">
                  {findShowEvent?.start && (
                    <span className="font-bold py-1 px-2 rounded-[4px] text-[18px] bg-primary text-white">
                      Horário de inicio:{" "}
                      {getFormattedDate(findShowEvent?.start, "hour")}
                    </span>
                  )}
                  <span className="font-bold py-1 px-2 rounded-[4px] text-[18px] bg-primary text-white">
                    Horário de fim:{" "}
                    {findShowEvent?.extendedProps?.end
                      ? getFormattedDate(
                          findShowEvent?.extendedProps?.end,
                          "hour"
                        )
                      : "Não definido"}
                  </span>
                </div>
              )}
              {findShowEvent?.start && (
                <span className="font-bold">
                  Data: {getFormattedDate(findShowEvent?.start, "completeDay")}
                  {findShowEvent?.extendedProps?.end &&
                    getFormattedDate(
                      findShowEvent?.extendedProps?.end,
                      "completeDay"
                    ) !==
                      getFormattedDate(findShowEvent?.start, "completeDay") &&
                    `- ${getFormattedDate(
                      findShowEvent?.extendedProps?.end,
                      "completeDay",
                      true
                    )}`}
                </span>
              )}
              <span className="font-bold">Criador: {user?.name}</span>
              <span className="font-bold text-gray-300">
                Participantes: ...
              </span>
              <span className="font-bold text-gray-300">Links: ...</span>
              <span className="font-bold text-gray-300">Tags: ...</span>
              <div className="flex items-center justify-start mt-6">
                {findShowEvent?.allDay && (
                  <span className="bg-yellow-400 p-3 rounded-[8px] text-[12px] font-bold">
                    Esse evento irá durar o dia todo
                  </span>
                )}
              </div>
              <div className="py-3 px-6 flex w-full items-center justify-end">
                <button
                  type="button"
                  className="font-bold w-full inline-flex justify-center rounded-md border border-transparent shadow-sm border-red-500 hover:bg-red-500 hover:text-white transform transition-all px-4 py-2 text-base text-red-500 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm disabled:text-gray-400"
                  onClick={() => setShowDeleteModal(true)}
                  disabled={modalEdit}
                >
                  Apagar evento
                </button>
                <button
                  type="button"
                  className="font-bold mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:text-gray-400 disabled:border-none"
                  onClick={() => {
                    setModalEdit(true);
                    formik.values.title = findShowEvent?.title;
                    formik.values.description =
                      findShowEvent?.extendedProps?.description;
                  }}
                  disabled={modalEdit}
                >
                  Editar
                </button>
                <button
                  type="button"
                  className="font-bold mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:text-gray-400 disabled:border-none"
                  onClick={() => {
                    onClose();
                    setModalEdit(false);
                  }}
                  disabled={modalEdit}
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
                onConfirm={handleDeleteEvent}
              />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default EventModal;
