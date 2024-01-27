import images from "@/assets/images";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Fragment } from "react";

interface UserProfileModalI {
  isOpen: boolean;
  onClose: () => void;
  userData: {
    name: string;
    email: string;
  };
}

const UserProfileModal = ({ isOpen, onClose, userData }: UserProfileModalI) => {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={onClose}
      >
        <div className="flex w-full h-screen items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
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
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all mt-[10%] sm:align-middle sm:max-w-lg sm:w-full">
              <div className="p-6 flex flex-col items-center justify-start gap-4">
                <h2 className="text-lg font-semibold">Informações</h2>
                <div className="w-8/12  cursor-pointer">
                  <Image
                    src={images.avatar}
                    alt="Avatar"
                    className="rounded-full"
                  />
                </div>
                <p className="font-bold w-full text-start px-8">
                  Nome: {userData.name}
                </p>
                <p className="font-bold w-full text-start px-8">
                  Email: {userData.email}
                </p>
                <p className="font-bold w-full text-gray-300 text-start px-8">
                  Telefone: (xx) xxxxx-xxxx
                </p>
                <p className="font-bold w-full text-gray-300 text-start px-8">
                  Endereço: Rua xxxxx, 1234, Bairro, Cidade - UF
                </p>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                >
                  Fechar
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserProfileModal;
