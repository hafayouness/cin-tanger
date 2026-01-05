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

/**
 * @swagger
 * tags:
 *   name: Sessions
 *   description: Gestion des séances
 */

/**
 * @swagger
 * /sessions:
 *   get:
 *     summary: Récupérer toutes les sessions
 *     tags: [Sessions]
 */
router.get("/", getAllSessions);

/**
 * @swagger
 * /sessions/movie/{movieId}:
 *   get:
 *     summary: Récupérer les sessions d’un film
 *     tags: [Sessions]
 *     parameters:
 *       - in: path
 *         name: movieId
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/movie/:movieId", getSessionsByMovie);

/**
 * @swagger
 * /sessions/{id}:
 *   get:
 *     summary: Récupérer une session par ID
 *     tags: [Sessions]
 */
router.get("/:id", getSessionById);

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Créer une session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Session'
 */
router.post("/", createSession);

/**
 * @swagger
 * /sessions/{id}:
 *   put:
 *     summary: Mettre à jour une session
 *     tags: [Sessions]
 */
router.put("/:id", updateSession);

/**
 * @swagger
 * /sessions/{id}:
 *   delete:
 *     summary: Supprimer une session
 *     tags: [Sessions]
 */
router.delete("/:id", deleteSession);

export default router;
