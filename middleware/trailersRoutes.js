import { trailerSchema } from "../models/Trailer.js";

export const handleQueryParams = (req, res, next) => {
  // Construct query object based on query params
  const query = {
    $or: [
      { trailerNumber: req.query.trailerNumber },
      { referenceNumber: req.query.referenceNumber },
      {
        trailerNumber: { $exists: false },
        referenceNumber: { $exists: false },
      },
    ],
  };

  if (req.query.dateFrom) {
    // Update the dateFrom and dateTo formats before adding them to the query object
    const dateFrom = req.query.dateFrom.split("-").reverse().join("-");
    const dateTo = req.query.dateTo
      ? req.query.dateTo.split("-").reverse().join("-")
      : "2099-12-31";

    // Add the date range to the query object
    query.sentDate = {
      $gte: new Date(dateFrom),
      $lte: new Date(dateTo),
    };
  }

  // Loop through all keys in the request query object and add filters to the query object
  Object.keys(req.query).forEach((key) => {
    if (!Object.keys(trailerSchema.paths).includes(key)) {
      // Skip over any keys that are not fields in the trailer schema
      return;
    }
    const value = req.query[key];
    query[key] = value;
  });

  req.mongoQuery = query;
  next();
};
