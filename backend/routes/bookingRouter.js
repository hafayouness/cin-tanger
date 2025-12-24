import express from "express";
import {
  getAllBookings,
  getBookingById,
  getBookingByReference,
  createBooking,
  cancelBooking,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.get("/", getAllBookings);
router.get("/:id", getBookingById);
router.get("/reference/:reference", getBookingByReference);
router.post("/", createBooking);
router.put("/:id/cancel", cancelBooking);
router.delete("/:id", deleteBooking);

export default router;
