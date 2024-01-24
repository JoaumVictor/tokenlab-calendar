export interface Event {
  id: number;
  description: string;
  title: string;
  startTime: Date;
  endTime: Date;
  allDay: boolean;
  userId: number;
}
