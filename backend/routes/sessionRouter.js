import express from "express";
import {
  getAllSessions,
  getSessionById,
  createSession,
  updateSession,
  deleteSession,
  getSessionsByMovie,
} from "../controllers/sessionController.js";

const router = express.Router();

router.get("/", getAllSessions);
router.get("/:id", getSessionById);
router.get("/movie/:movieId", getSessionsByMovie);
router.post("/", createSession);
router.put("/:id", updateSession);
router.delete("/:id", deleteSession);

export default router;
