import { Router } from "express";
import { getTrailer } from "../controllers/trailers.js";
import { formatDates } from "../middleware/dayRoutes.js";
const router = Router();

//Get Days Data within specified date range
router.get("/query/:number", getTrailer);

export default router;
