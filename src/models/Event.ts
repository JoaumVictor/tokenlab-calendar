export interface Event {
  title: string;
  start: Date | string | null;
  allDay: boolean;
  id: string;
  extendedProps: {
    description: string;
    userId: number;
    end?: Date | string;
  };
  end?: Date | string | null;
  participantsOnEvents?: number[];
}

export interface EventInBack {
  title: string;
  start: string;
  id?: number;
  allDay: boolean;
  description: string;
  userId: number;
  end: string | null;
  // participantsOnEvents?: {
  //   userId: number;
  // }[];
}
