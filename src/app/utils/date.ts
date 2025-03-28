export const toLocalDatetime = (date: Date) => {
  const offset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const localISOTime = new Date(date.getTime() - offset)
    .toISOString()
    .slice(0, 19);
  return localISOTime;
};
