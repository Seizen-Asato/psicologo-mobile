export const isValidDate = (date: string): boolean => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
};

export const getWeekRange = (date: Date = new Date()) => {
  const day = date.getDay(); // 0 = domingo, 1 = lunes...
  const monday = new Date(date);
  monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1));

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    desde: formatDate(monday),
    hasta: formatDate(sunday),
    monday,
    sunday,
  };
};

export const getMonthRange = (date: Date = new Date()) => {
  const first = new Date(date.getFullYear(), date.getMonth(), 1);
  const last = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  return {
    desde: formatDate(first),
    hasta: formatDate(last),
    first,
    last,
  };
};

export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const addDays = (date: Date, days: number): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};
