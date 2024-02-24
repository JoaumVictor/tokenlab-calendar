// "use client";

// import React, { createContext, useContext, useState } from "react";
// import { Event } from "@/models/Event";

// interface EventContextProps {
//   eventOn: Event;
//   setEventOn: (event: Event) => void;
// }

// export const EventContext = createContext<EventContextProps>(
//   {} as EventContextProps
// );

// interface EventProviderProps {
//   children: React.ReactNode;
// }

// export const EventProvider = ({ children }: EventProviderProps) => {
//   const [eventOn, setEventOn] = useState<Event>({} as Event);

//   return (
//     <EventContext.Provider value={{ eventOn, setEventOn }}>
//       {children}
//     </EventContext.Provider>
//   );
// };
