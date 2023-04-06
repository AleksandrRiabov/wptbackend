import { Router } from "express";
import {getDayData} from '../controllers/day.js'
const router = Router();


router.get("/", getDayData)


export default  router