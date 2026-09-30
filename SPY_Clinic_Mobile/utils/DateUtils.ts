export const isValidDate = (date: string): boolean => {
  return /^\d{4}-\d{2}-\d{2}$/.test(date);
};

export const getWeekRange = (date: Date = new Date()) => {
  const day = date.getDay();
  const monday = new Date(date);
  monday.setDate(date.getDate() - (day === 0 ? 6 : day - 1));

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  return {
    desde: monday.toISOString().split("T")[0],
    hasta: sunday.toISOString().split("T")[0],
  };
};
