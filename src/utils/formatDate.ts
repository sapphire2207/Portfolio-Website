export function formatDate(dateStr: string): string {
  if (!dateStr) {
    return "";
  }

  const date = new Date(dateStr);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(date);
}
