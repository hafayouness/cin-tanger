import express from "express";
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie } from "../controller/movieController.js";


const router = express.Router();

router.post("/", createMovie);
router.get("/", getAllMovies);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);


export default router;