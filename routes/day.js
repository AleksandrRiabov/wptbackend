import { Router } from "express";
import {
  getDaysDataInRange,
  createDay,
  updateDayFigures,
} from "../controllers/day.js";
import { formatDates } from "../middleware/dayRoutes.js";
const router = Router();

//Get Days Data within specified date range
router.get("/:range?", formatDates, getDaysDataInRange);

//Create new Day Data
router.post("/", createDay);

//Edit Day Data
router.put("/", updateDayFigures);

export default router;
