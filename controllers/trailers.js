import Trailer from "../models/Trailer.js";

export const getTrailers = async (req, res) => {
  // Parse limit and skip from query params or use default values
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;

  try {
    // Query the database for trailers matching the query and apply limit and skip options
    const trailers = await Trailer.find(req.mongoQuery).skip(skip).limit(limit);
    res.status(200).json(trailers);
  } catch (error) {
    // Handle any errors that occur during the query
    res.status(500).json({ error: error.message });
  }
};

// ======================
//  CREATE NEW TRAILER DETAILS
export const createTrailer = async (req, res) => {
  const { trailer } = req.body;

  try {
    const newTrailer = await Trailer.create(trailer);
    res
      .status(201)
      .json({ message: "Trailer details has been added", newTrailer });
  } catch (error) {
    res.status(500).json(error);
  }
};

// const tral = {
//   reference: "1204231243",
//   sentDate: new Date("2023-04-11"),
//   number: "R1243BCP",
//   received: Date,
//   clearance: Date,
//   loadType: "Frozen / Ambient",
//   freightType: "Sea",
//   cert: false,
//   extraCost: { cost: 0, comment: "No Extra cost" },
//   algecirasFerry: { cost: 0 },
//   rejectedBySIVEP: { cost: 0 },
//   holdOver: { days: 0, cost: 0 },
//   nonStop: { cost: Number },
//   crossed: "Tonnel",
//   comments: "",
//   products: [
//     {
//       name: "Chill",
//       cases: "2789",
//       pallets: 26,
//       category: "fresh",
//     },
//   ],
//   editedBy: [
//     {
//       name: String,
//       date: Date,
//     },
//   ],
// };

// http://localhost:3001/trailers?trailerNumber=123&referenceNumber=ABC&sentDateFrom=2022-01-01&sentDateTo=2022-12-31&sort=trailerNumber&limit=20&skip=10

// In this example, the API endpoint is /trailers, and the query parameters used are:

// trailerNumber=123: Find trailers with the given trailer number.
// referenceNumber=ABC: Find trailers with the given reference number.
// sentDateFrom=2022-01-01: Find trailers sent on or after the given date.
// sentDateTo=2022-12-31: Find trailers sent on or before the given date.
// sort=trailerNumber: Sort the results by trailer number.
// limit=20: Limit the number of results returned to 20.
// skip=10: Skip the first 10 results.
// These query parameters can be used in any combination or left out entirely depending on the desired search criteria.
