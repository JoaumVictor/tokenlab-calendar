import { Fragment, useState, useEffect, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Event } from "@/models/Event";
import CustomModal from "../customModal";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Input } from "@/components";

interface ModalProps {
  eventOn: Event | null;
  setEventOn: React.Dispatch<React.SetStateAction<Event | null>>;
  isOpen: boolean;
  onClose: () => void;
  calendarEvents: Event[];
  setDraggableEvents: React.Dispatch<React.SetStateAction<Event[]>>;
  draggableEvents: Event[];
}

const EditEventModal: React.FC<ModalProps> = ({
  eventOn,
  setEventOn,
  isOpen,
  onClose,
  calendarEvents,
  setDraggableEvents,
  draggableEvents,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    if (!eventOn) return;
    const newDraggableEvents = draggableEvents.filter(
      (event) => event.id !== eventOn.id
    );
    setDraggableEvents(newDraggableEvents);
    setShowDeleteModal(false);
    onClose();
  };

  const verifyIfEventExistInCalendar =
    eventOn && calendarEvents.some((event) => event.title === eventOn.title);

  const [deleteErrorMessage, setDeleteErrorMessage] = useState("");

  useEffect(() => {
    setDeleteErrorMessage("");
  }, [isOpen]);

  const validationSchema = Yup.object({
    title: Yup.string().required("O título é obrigatório"),
    description: Yup.string().required("A descrição é obrigatória"),
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      if (formik.isValid) {
        console.log("atualizar calendário e lista com esses values", values);
        cleanFormik();
      }
    },
  });

  useEffect(() => {
    if (!eventOn) return;
    formik.values.title = eventOn.title;
    formik.values.description = eventOn.extendedProps?.description;
  }, [isOpen, formik.values, eventOn]);

  const cleanFormik = () => {
    formik.values.title = "";
    formik.values.description = "";
    formik.touched.title = false;
    formik.touched.description = false;
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
              <span className="w-full text-center font-bold text-2xl">
                Editar Evento
              </span>
              <p className="text-green-400 font-bold">
                NOTA: verificar o atraso dos dados
              </p>
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

              <p className="text-red-500 text-center w-full font-bold">
                {deleteErrorMessage}
              </p>
              <div className="py-3 px-6 flex w-full items-center justify-end">
                <button
                  type="button"
                  className="font-bold w-full inline-flex justify-center rounded-md border border-transparent shadow-sm bg-primary text-white transform transition-all px-4 py-2 text-base focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => formik.handleSubmit()}
                >
                  Salvar alterações
                </button>
                <button
                  type="button"
                  className="font-bold w-full inline-flex justify-center rounded-md border border-transparent shadow-sm border-red-500 hover:bg-red-500 hover:text-white transform transition-all px-4 py-2 text-base text-red-500 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    if (verifyIfEventExistInCalendar) {
                      setDeleteErrorMessage(
                        "Remova o evento do calendário antes de apagar"
                      );
                    } else {
                      setDeleteErrorMessage("");
                      setShowDeleteModal(true);
                    }
                  }}
                >
                  Apagar evento
                </button>
                <button
                  type="button"
                  className="font-bold mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    cleanFormik();
                    onClose();
                  }}
                >
                  Fechar
                </button>
              </div>
              <CustomModal
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                title="Apagar evento"
                message="Tem certeza que deseja apagar esse evento da lista?"
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

export default EditEventModal;
