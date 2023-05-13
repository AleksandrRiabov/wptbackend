import { Router } from "express";
import { createTrailer, editTrailer } from "../controllers/trailers.js";
import { getTrailers } from "../controllers/trailers.js";
import { handleQueryParams } from "../middleware/trailersRoutes.js";
const router = Router();

//Get Days Data within specified date range
router.get("/trailers/", handleQueryParams, getTrailers);

//Create new trailer
router.post("/trailer/", createTrailer);

//Edit trailer
router.put("/trailer/:id", editTrailer);

export default router;
