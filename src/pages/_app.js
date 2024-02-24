import "@/app/globals.css";
import { AuthProvider } from "@/context/user";
import { EventProvider } from "@/context/event";

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <EventProvider>
        <Component {...pageProps} />
      </EventProvider>
    </AuthProvider>
  );
}
