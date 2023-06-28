import { Router } from "express";
import {
  createTrailer,
  deleteTrailer,
  editTrailer,
} from "../controllers/trailers.js";
import { getTrailers } from "../controllers/trailers.js";
import { handleQueryParams } from "../middleware/trailersRoutes.js";
const router = Router();

//Get Days Data within specified date range
router.get("/trailers/", handleQueryParams, getTrailers);

//Create new trailer
router.post("/trailer/", createTrailer);

//Edit trailer
router.put("/trailer/:id", editTrailer);

// Delete Trailer
router.delete("/trailer/:id", deleteTrailer);

export default router;
