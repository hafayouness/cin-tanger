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

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Gestion des réservations
 */

/**
 * @swagger
 * /bookings:
 *   get:
 *     summary: Récupérer toutes les réservations
 *     tags: [Bookings]
 *     responses:
 *       200:
 *         description: Succès
 */
router.get("/", getAllBookings);

/**
 * @swagger
 * /bookings/reference/{reference}:
 *   get:
 *     summary: Récupérer une réservation par référence
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: reference
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Réservation trouvée
 */
router.get("/reference/:reference", getBookingByReference);

/**
 * @swagger
 * /bookings/{id}:
 *   get:
 *     summary: Récupérer une réservation par ID
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.get("/:id", getBookingById);

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Créer une réservation
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Booking'
 *     responses:
 *       201:
 *         description: Réservation créée
 */
router.post("/", createBooking);

/**
 * @swagger
 * /bookings/{id}/cancel:
 *   put:
 *     summary: Annuler une réservation
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 */
router.put("/:id/cancel", cancelBooking);

/**
 * @swagger
 * /bookings/{id}:
 *   delete:
 *     summary: Supprimer une réservation
 *     tags: [Bookings]
 */
router.delete("/:id", deleteBooking);

export default router;
