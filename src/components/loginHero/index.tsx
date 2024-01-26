"use client";

import { classNames } from "@/util/shared";
import { BoxContent, Button } from "@/components";
import RegisterUser from "../registerUser";
import LoginUser from "../loginUser";

import { useRouter } from "next/navigation";
import { useState } from "react";

function LoginHero() {
  const router = useRouter();

  const textClass = "text-5xl font-semibold";

  const [loginOrRegister, setLoginOrRegister] = useState<"login" | "register">(
    "login"
  );

  return (
    <BoxContent>
      <main className="min-h-[620px] flex items-center justify-between">
        <div className="w-1/2 gap-3 flex flex-col items-start justify-center">
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
        {loginOrRegister === "login" ? (
          <LoginUser handleRegister={() => setLoginOrRegister("register")} />
        ) : (
          <RegisterUser handleLogin={() => setLoginOrRegister("login")} />
        )}
      </main>
    </BoxContent>
  );
}

export default LoginHero;
