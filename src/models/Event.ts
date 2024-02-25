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
  participantsOnEvents?: number[];
}

export interface EventInBack {
  title: string;
  start: string;
  allDay: boolean;
  description: string;
  userId: number;
  end?: string;
  // participantsOnEvents?: {
  //   userId: number;
  // }[];
}
