"use client";

import icons from "@/assets";
import Image from "next/image";
import { BoxContent } from "..";

function Header() {
  return (
    <header className="w-full h-[76px] flex items-center justify-between">
      <BoxContent>
        <div className="relative max-w-[202px] w-full">
          <Image src={icons.tokenLabLogo} alt="TokenLabLogo" />
        </div>
      </BoxContent>
    </header>
  );
}

export default Header;
