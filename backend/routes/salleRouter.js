import express from "express";
import {
  getAllSalles,
  getSalleById,
  createSalle,
  updateSalle,
  deleteSalle,
} from "../controllers/salleController.js";

const router = express.Router();

router.get("/", getAllSalles);
router.get("/:id", getSalleById);
router.post("/", createSalle);
router.put("/:id", updateSalle);
router.delete("/:id", deleteSalle);

export default router;
