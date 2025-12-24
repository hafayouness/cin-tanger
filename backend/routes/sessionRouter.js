import express from "express";
import {
  getAllShowtimes,
  getShowtimeById,
} from "../controllers/sessionController.js";


const router = express.Router();

router.get("/showtimes", getAllShowtimes);
router.get("/showtimes/:id", getShowtimeById);




export default router;
