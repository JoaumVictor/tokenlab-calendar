import { format, parseISO } from "date-fns";

type DatePart = "day" | "monthly" | "year" | "hour";

export function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export const getFormattedDate = (
  dateInput: string | Date,
  part: DatePart
): string | null => {
  const date = typeof dateInput === "string" ? parseISO(dateInput) : dateInput;

  if (isNaN(date.getTime())) {
    console.error("Formato de data inválido.");
    return null;
  }

  const formatMap: Record<DatePart, string> = {
    day: "d",
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
    const formattedPart = format(date, formatString);
    return formattedPart;
  } catch (error) {
    console.error("Erro ao formatar a data:", error);
    return null;
  }
};
