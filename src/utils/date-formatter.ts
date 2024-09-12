export function formatDate(dateString: string): string {
  if (!dateString || typeof dateString !== "string") return "-";

  try {
    const year = parseInt(dateString.slice(0, 4), 10);
    const month = parseInt(dateString.slice(4, 6), 10) - 1;
    const day = parseInt(dateString.slice(6), 10);
    const date = new Date(year, month, day);

    if (isNaN(date.getTime())) throw new Error("تاریخ نامعتبر است!");

    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      calendar: "persian",
    };
    const formatter = new Intl.DateTimeFormat("fa-IR", options);
    return formatter.format(date);
  } catch (error) {
    console.error("Date formatting error:", error);
    return "تاریخ نامعتبر";
  }
}

export function formatFullDate(dateString: string): string {
  if (!dateString || typeof dateString !== "string") return "-";

  const [datePart] = dateString.split(" ");
  const [year, month, day] = datePart.split("-").map(Number);

  const date = new Date(year, month - 1, day);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    calendar: "persian",
  };

  const formatter = new Intl.DateTimeFormat("fa-IR", options);
  return formatter.format(date);
}
