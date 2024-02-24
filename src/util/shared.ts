import { format, parseISO, sub } from "date-fns";
import { Event } from "../models/Event";

type DatePart = "day" | "completeDay" | "monthly" | "year" | "hour";

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export function generateRandomId() {
  return Math.floor(Math.random() * 1000000);
}

export const getFormattedDate = (
  dateInput: string | Date,
  part: DatePart,
  subOneDay = false
): string | null => {
  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    console.error("Formato de data inválido.");
    return null;
  }

  const formatMap: Record<DatePart, string> = {
    day: "d",
    completeDay: "dd/MM/yyyy",
    monthly: "MMMM",
    year: "yyyy",
    hour: "HH:mm",
  };

  const formatString = formatMap[part];

  if (!formatString) {
    console.error("Opção de parte da data inválida.");
    return null;
  }

  try {
    const formattedPart = !subOneDay
      ? format(date, formatString)
      : format(sub(date, { days: 1 }), formatString);
    return formattedPart;
  } catch (error) {
    console.error("Erro ao formatar a data:", error);
    return null;
  }
};

export const feriadosNacionais: Event[] = [
  {
    title: "Ano Novo",
    start: "2024-01-01",
    allDay: true,
    id: 12345,
    extendedProps: { description: "Celebração do Ano Novo", userId: 0 },
  },
  {
    title: "Carnaval",
    start: "2024-02-25",
    allDay: true,
    id: 12345,
    extendedProps: { description: "Feriado de Carnaval", userId: 0 },
  },
  {
    title: "Páscoa",
    start: "2024-04-21",
    allDay: true,
    id: 12345,
    extendedProps: { description: "Celebração da Páscoa", userId: 0 },
  },
  {
    title: "Tiradentes",
    start: "2024-04-21",
    allDay: true,
    id: 12345,
    extendedProps: { description: "Feriado de Tiradentes", userId: 0 },
  },
  {
    title: "Dia do Trabalho",
    start: "2024-05-01",
    allDay: true,
    id: 12345,
    extendedProps: { description: "Celebração do Dia do Trabalho", userId: 0 },
  },
  {
    title: "Independência do Brasil",
    start: "2024-09-07",
    allDay: true,
    id: 12345,
    extendedProps: {
      description: "Feriado da Independência do Brasil",
      userId: 0,
    },
  },
  {
    title: "Nossa Senhora Aparecida",
    start: "2024-10-12",
    allDay: true,
    id: 12345,
    extendedProps: {
      description: "Feriado de Nossa Senhora Aparecida",
      userId: 0,
    },
  },
  {
    title: "Finados",
    start: "2024-11-02",
    allDay: true,
    id: 12345,
    extendedProps: { description: "Feriado de Finados", userId: 0 },
  },
  {
    title: "Proclamação da República",
    start: "2024-11-15",
    allDay: true,
    id: 12345,
    extendedProps: {
      description: "Feriado da Proclamação da República",
      userId: 0,
    },
  },
  {
    title: "Natal",
    start: "2024-12-25",
    allDay: true,
    id: 12345,
    extendedProps: { description: "Celebração de Natal", userId: 0 },
  },
];
