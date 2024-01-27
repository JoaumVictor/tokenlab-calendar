import { BoxContent, Button } from "@/components";
import Image from "next/image";
import { useRouter } from "next/router";
import icons from "@/assets";

export default function BasicHeader() {
  const links = [
    {
      label: "O QUE FAZEMOS",
      href: "https://tokenlab.com.br/pt/home/#what-we-do",
    },
    {
      label: "SOBRE NÓS",
      href: "https://tokenlab.com.br/pt/about-us",
    },
    {
      label: "CASES",
      href: "https://tokenlab.com.br/pt/cases",
    },
    {
      label: "CLIENTES",
      href: "https://tokenlab.com.br/pt/home/#costumers",
    },
    {
      label: "TRABALHE CONOSCO",
      href: "https://tokenlab.gupy.io/",
    },
    {
      label: "BLOG",
      href: "https://blog.tokenlab.com.br/",
    },
  ];

  const router = useRouter();

  return (
    <header className="w-full py-4 flex items-center justify-between">
      <BoxContent className="max-w-screen-2xl">
        <div className="flex items-center justify-between w-full gap-5">
          <div
            onClick={() => router.push("/login")}
            className="relative max-w-[202px] w-full cursor-pointer"
          >
            <Image src={icons.tokenLabLogo} alt="TokenLabLogo" />
          </div>
          <nav className="w-[60%] flex items-center justify-between">
            {links.map((link) => (
              <a
                className="text-tertiary mt-[14px] h-[26px] text-[16px] nav-links font-bold hover:border-b-2 hover:border-b-primary transition-border-b transform text-nowrap"
                href={link.href}
                key={link.label}
              >
                {link.label}
              </a>
            ))}
            <Button
              label="FALE CONOSCO"
              onClick={() =>
                router.push("https://tokenlab.com.br/pt/contact-us")
              }
              type="primary"
              className="text-[14px] text-nowrap py-2 px-4"
            />
          </nav>
        </div>
      </BoxContent>
    </header>
  );
}
