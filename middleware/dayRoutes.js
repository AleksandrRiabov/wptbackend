//Separate dates from range and format from DD-MM-YYYY to YYYY-MM-DD
// Will be needed when query in DB
export const formatDates = (req, res, next) => {
  const { dateFrom, dateTo } = req.query;

  const startDate = dateFrom?.split("-").reverse().join("-");
  const endDate = dateTo?.split("-").reverse().join("-");

  req.dateFrom = startDate
    ? new Date(startDate).setHours(0, 0, 0, 0)
    : new Date().setHours(0, 0, 0, 0);
  req.dateTo = endDate
    ? new Date(endDate).setHours(23, 59, 59, 999)
    : new Date().setHours(23, 59, 59, 999);

  next();
};
