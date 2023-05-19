import { Router } from "express";
import { getOptions, updateOptions } from "../controllers/options.js";
const router = Router();

//Get All options Data within
router.get("/", getOptions);

//Edit Options Data
router.put("/", updateOptions);

export default router;
