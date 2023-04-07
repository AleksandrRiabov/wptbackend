//Separate dates from range and format from DD-MM-YYYY to YYYY-MM-DD
// Will be needed when query in DB
export const formatDates = (req, res, next) => {
  const { range } = req.params;

  const startDate = range?.split("_")[0]?.split("-").reverse().join("-");
  const endDate = range?.split("_")[1]?.split("-").reverse().join("-");

  req.startDate = startDate
    ? new Date(startDate).setHours(0, 0, 0, 0)
    : new Date().setHours(0, 0, 0, 0);
  req.endDate = endDate
    ? new Date(endDate).setHours(23, 59, 59, 999)
    : new Date().setHours(23, 59, 59, 999);

  next();
};
