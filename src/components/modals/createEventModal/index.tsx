import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoWarningOutline } from "react-icons/io5";
import { GoInfo } from "react-icons/go";
import { Input } from "@/components";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactLoading from "react-loading";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

interface FormValues {
  title: string;
  description: string;
}

const CreateEventModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  const initialValues = {
    title: "",
    description: "",
  };
  const [loading, setLoading] = useState<boolean>(false);

  const validationSchema = Yup.object({
    title: Yup.string().required("O título é obrigatório"),
    description: Yup.string().required("A descrição é obrigatória"),
  });

  const onSubmit = (values: FormValues) => {
    setLoading(true);
    if (formik.isValid) {
      onConfirm();
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-lg sm:w-full mt-[10%]">
              <div className="bg-slate-100 px-4 sm:px-6 py-3 gap-3">
                <h1>Crie um evento</h1>
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
                />
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => formik.handleSubmit()}
                >
                  {loading ? (
                    <ReactLoading
                      type="spin"
                      color="#fff"
                      height={20}
                      width={20}
                    />
                  ) : (
                    "Criar"
                  )}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => {
                    formik.touched.title = false;
                    formik.touched.description = false;
                    onClose();
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CreateEventModal;
