import { Router } from "express";
import { getOptions, updateOptions } from "../controllers/options.js";
import { checkUserRole } from "../middleware/checkUserRole.js";
const router = Router();

//Get All options Data within
router.get("/", getOptions);

//Edit Options Data
router.put("/", checkUserRole, updateOptions);

export default router;
