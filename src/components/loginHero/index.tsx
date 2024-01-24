"use client";

import { classNames } from "@/util/shared";
import { BoxContent, Button } from "@/components";
import { useRouter } from "next/navigation";

function LoginHero() {
  const router = useRouter();

  const textClass = "text-5xl font-semibold";

  const handleLogin = () => {
    router.push("/calendar");
  };

  return (
    <BoxContent>
      <main className="min-h-[620px] h-full flex items-center">
        <div className="w-1/2 gap-5 flex flex-col items-start justify-center">
          <h1 className={classNames(textClass, "text-primary w-3/4")}>
            Somos o{" "}
            <span className={classNames(textClass, "text-secondary")}>
              parceiro certo{" "}
            </span>
            para seus{" "}
            <span className={classNames(textClass, "text-secondary")}>
              projetos digitais!
            </span>
          </h1>
          <p className="text-secondary opacity-95 w-4/5 text-[22px] tracking-wider">
            Saiba como podemos te ajudar a potencializar sua área de TI com
            UI/UX, arquitetura de software, cloud, desenvolvimento web e mobile,
            IOT e muito mais!
          </p>
          <Button
            label="Saiba mais"
            type="primary"
            onClick={() => router.push("https://tokenlab.com.br/pt/about-us")}
            className="text-xl"
          />
        </div>
        <div className="w-1/2 border-red-500 border flex flex-col items-start justify-center">
          <p>EM DESENVOLVIMENTO</p>
          <p>login</p>
          <p>senha</p>
          <button onClick={handleLogin}>Entrar</button>
        </div>
      </main>
    </BoxContent>
  );
}

export default LoginHero;
