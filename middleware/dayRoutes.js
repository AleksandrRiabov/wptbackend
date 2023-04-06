//Separate dates from range and format from DD-MM-YYYY to YYYY-MM-DD
// Will be needed when query in DB
export const formatDates = (req, res, next) => {
  const { range } = req.params;

  const startDate =
    range?.split("_")[0]?.split("-").reverse().join("-") || new Date();
  const endDate =
    range?.split("_")[1]?.split("-").reverse().join("-") || new Date();
  req.startDate = startDate;
  req.endDate = endDate;

  next();
};
