import Trailer from "../models/Trailer.js";

export const getTrailers = async (req, res) => {
  // Parse limit and skip from query params or use default values
  const limit = req.query.limit ? parseInt(req.query.limit) : 100;
  const skip = req.query.skip ? parseInt(req.query.skip) : 0;

  try {
    // Query the database for trailers matching the query and apply Limit and Skip options
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
  try {
    const newTrailer = await Trailer.create(req.body);
    res
      .status(201)
      .json({ message: "Trailer details has been added", newTrailer });
  } catch (error) {
    res.status(500).json(error);
  }
};

// ======================
//  EDIT TRAILER DETAILS
export const editTrailer = async (req, res) => {
  try {
    const updatedTrailer = await Trailer.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Trailer details has been updated", updatedTrailer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
