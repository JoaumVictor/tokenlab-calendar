export interface Event {
  title: string;
  start: Date | string;
  allDay: boolean;
  id: number;
  extendedProps: {
    description: string;
    userId: number;
    end?: Date | string;
  };
  participantsOnEvents?: number[];
}
