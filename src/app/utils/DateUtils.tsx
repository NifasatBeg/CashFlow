export const getStartDateUTC = (timeframe:string) => {
  const now = new Date();
  let start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));

  switch (timeframe.toLowerCase()) {
    case "day":
      start.setUTCDate(start.getUTCDate() - 6); // Last 7 days (including today)
      break;
    case "week":
      start.setUTCDate(start.getUTCDate() - 28); // Last 4 weeks
      break;
    case "month":
      start.setUTCMonth(start.getUTCMonth() - 5, 1); // Last 6 months (start of the month)
      break;
    case "year":
      start.setUTCFullYear(start.getUTCFullYear() - 2, 0, 1); // Last 3 years (Jan 1st)
      break;
    default:
      throw new Error("Invalid timeframe: " + timeframe);
  }

  return start.getTime(); // Return as epoch time in milliseconds
};

export const getEndDateUTC = () => {
  const now = new Date();
  now.setUTCHours(23, 59, 59, 999); // Set end of the day in UTC
  return now.getTime(); // Return as epoch time in milliseconds
};