import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import AuthContext from "@/context/user";
import images from "@/assets/images";
import { Popover } from "@headlessui/react";
import { BoxContent, Button } from "@/components";
import Image from "next/image";
import icons from "@/assets";
import UserProfileModal from "@/components/modals/userProfileModal";
import { classNames } from "@/util/shared";
import CustomModal from "@/components/modals/customModal";
import { EventContext } from "@/context/event";

export default function DefaultHeader() {
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);
  const [userProfileShow, setUserProfileShow] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

  const { updateCalendarEvents } = useContext(EventContext);

  const profileOptions = [
    {
      label: "Meu Perfil",
      onClick: () => setUserProfileShow(true),
    },
    {
      label: "Configurações",
      onClick: () => window.alert("Essa implementação está em desenvolvimento"),
    },
    {
      label: "Sair",
      className: "text-red-600 hover:text-red-600",
      onClick: () => setShowExitModal(true),
    },
  ];

  return (
    <header className="w-full h-[76px] flex items-center justify-between">
      <BoxContent>
        <div className="flex items-center justify-between">
          <div
            onClick={() => router.push("https://www.tokenlab.com.br/pt/home")}
            className="relative max-w-[202px] w-full cursor-pointer"
          >
            <Image src={icons.tokenLabLogo} alt="TokenLabLogo" />
          </div>

          <div className="flex items-center justify-center gap-2">
            <Popover className="min-w-[80px] flex items-center justify-center">
              {({ open }) => (
                <div className="relative w-full h-full flex items-center justify-center">
                  <Popover.Button>
                    <div className="max-w-[70px] w-full cursor-pointer border-none border-0 hover:scale-110 transform transition-all">
                      <Image
                        src={images.avatar}
                        alt="Avatar"
                        className="rounded-full"
                      />
                    </div>
                  </Popover.Button>
                  {open && (
                    <div className="absolute right-[calc(50% - 40px)] top-[95%] mt-2 bg-slate-100 p-4 rounded-[8px]">
                      <Popover.Panel static>
                        <ul className="dropdown-list text-center">
                          {profileOptions.map((option) => (
                            <li
                              className={classNames(
                                "dropdown-item text-[16px] text-nowrap text-gray-600 font-bold hover:scale-105 transform transition-all cursor-pointer",
                                option?.className
                              )}
                              onClick={option.onClick}
                              key={option.label}
                            >
                              {option.label}
                            </li>
                          ))}
                        </ul>
                      </Popover.Panel>
                    </div>
                  )}
                </div>
              )}
            </Popover>
            <p>{`Bem-vindo(a) de volta ${user?.name.split(" ")[0]}`}</p>
          </div>
        </div>
      </BoxContent>
      <CustomModal
        isOpen={showExitModal}
        onClose={() => setShowExitModal(false)}
        type="error"
        title="Deseja realmente sair?"
        message={
          <span>
            Se houverem eventos não salvos no calendário{" "}
            <span className="text-red-500">serão perdidos</span>.
          </span>
        }
        onConfirm={() => {
          if (logout) {
            updateCalendarEvents([]);
            logout();
            router.push("/login");
          }
        }}
      />
      <UserProfileModal
        isOpen={userProfileShow}
        onClose={() => setUserProfileShow(false)}
        userData={{ email: user?.email || "", name: user?.name || "" }}
      />
    </header>
  );
}
