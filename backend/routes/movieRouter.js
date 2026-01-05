import express from "express";
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: Gestion des films
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Récupérer tous les films
 *     tags: [Movies]
 */
router.get("/", getAllMovies);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Récupérer un film par ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/:id", getMovieById);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Créer un film
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Movie'
 */
router.post("/", createMovie);

/**
 * @swagger
 * /movies/{id}:
 *   put:
 *     summary: Mettre à jour un film
 *     tags: [Movies]
 */
router.put("/:id", updateMovie);

/**
 * @swagger
 * /movies/{id}:
 *   delete:
 *     summary: Supprimer un film
 *     tags: [Movies]
 */
router.delete("/:id", deleteMovie);

export default router;
