"use client";

import { Header } from "@/components";
import LoginHero from "@/components/loginHero";
import { AuthProvider } from "@/context";

export default function Login() {
  return (
    <AuthProvider>
      <main className="flex min-h-screen flex-col items-start justify-between gap-5 w-full">
        <Header />
        <LoginHero />
        <footer
          style={{
            borderTopLeftRadius: "50% 30px",
            borderTopRightRadius: "50% 30px",
          }}
          className="bg-blue w-full min-h-[300px]"
        />
      </main>
    </AuthProvider>
  );
}
