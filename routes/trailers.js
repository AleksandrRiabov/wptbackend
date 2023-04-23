import { Router } from "express";
import { createTrailer } from "../controllers/trailers.js";
import { getTrailers } from "../controllers/trailers.js";
import { handleQueryParams } from "../middleware/trailersRoutes.js";
const router = Router();

//Get Days Data within specified date range
router.get("/", handleQueryParams, getTrailers);

//Create new trailer
router.post("/", createTrailer);

export default router;
