import { Router } from "express";
import { getDaysDataInRange, createOrUpdateDay } from "../controllers/day.js";
import { formatDates } from "../middleware/dayRoutes.js";
const router = Router();

//Get Days Data within specified date range
router.get("/:range?", formatDates, getDaysDataInRange);

//Create new Day Data OR update existing day
router.post("/", createOrUpdateDay);

export default router;
