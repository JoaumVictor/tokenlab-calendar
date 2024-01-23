import Image from "next/image";

import icons from "@/assets";

export default function Home() {
  // futura validação de login e redirecionamento

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 p-24">
      <div className="relative">
        <Image src={icons.tokenLabLogo} alt="TokenLabLogo" />
      </div>
      <p>Olá</p>
    </main>
  );
}
