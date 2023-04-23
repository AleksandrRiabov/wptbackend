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

  if (req.query.sentDateFrom) {
    // If sentDateFrom and sentDateTo are provided, add them to the query object
    query.sentDate = {
      $gte: new Date(req.query.sentDateFrom),
      $lte: req.query.sentDateTo
        ? new Date(req.query.sentDateTo)
        : new Date("2028-12-31"),
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
