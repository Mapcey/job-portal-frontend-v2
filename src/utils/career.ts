export const getLocalDateString = (date = new Date()): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

/** Treat an empty end date or today's date as an ongoing workplace. */
export const isCurrentWorkplace = (endDate?: string | null): boolean =>
  !endDate?.trim() || endDate.slice(0, 10) === getLocalDateString();
