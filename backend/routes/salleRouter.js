import express from "express";
import {
  getAllSalles,
  getSalleById,
  createSalle,
  updateSalle,
  deleteSalle,
} from "../controllers/salleController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Salles
 *   description: Gestion des salles
 */

/**
 * @swagger
 * /salles:
 *   get:
 *     summary: Récupérer toutes les salles
 *     tags: [Salles]
 */
router.get("/", getAllSalles);

/**
 * @swagger
 * /salles/{id}:
 *   get:
 *     summary: Récupérer une salle par ID
 *     tags: [Salles]
 */
router.get("/:id", getSalleById);

/**
 * @swagger
 * /salles:
 *   post:
 *     summary: Créer une salle
 *     tags: [Salles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Salle'
 */
router.post("/", createSalle);

/**
 * @swagger
 * /salles/{id}:
 *   put:
 *     summary: Mettre à jour une salle
 *     tags: [Salles]
 */
router.put("/:id", updateSalle);

/**
 * @swagger
 * /salles/{id}:
 *   delete:
 *     summary: Supprimer une salle
 *     tags: [Salles]
 */
router.delete("/:id", deleteSalle);

export default router;
