import { Router } from "express";
import { getDaysDataInRange } from "../controllers/day.js";
import { formatDates } from "../middleware/dayRoutes.js";
const router = Router();

router.get("/:range?", formatDates, getDaysDataInRange);

export default router;
