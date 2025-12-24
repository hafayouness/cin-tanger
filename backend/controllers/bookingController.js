
import Booking from "../models/Booking.js";
import Session from "../models/Session.js";
import Movie from "../models/Movie.js";
import Salle from "../models/Salle.js";
import sequelize from "../config/database.js";

// Générer une référence de réservation unique
const generateBookingReference = () => {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let reference = "BK";
  for (let i = 0; i < 8; i++) {
    reference += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return reference;
};

// GET - Toutes les réservations
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: Session,
          as: "session",
          include: [
            { model: Movie, as: "movie" },
            { model: Salle, as: "salle" },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET - Réservation par ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        {
          model: Session,
          as: "session",
          include: [
            { model: Movie, as: "movie" },
            { model: Salle, as: "salle" },
          ],
        },
      ],
    });
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Réservation non trouvée",
      });
    }
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET - Réservation par référence
export const getBookingByReference = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      where: { booking_reference: req.params.reference },
      include: [
        {
          model: Session,
          as: "session",
          include: [
            { model: Movie, as: "movie" },
            { model: Salle, as: "salle" },
          ],
        },
      ],
    });
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Réservation non trouvée",
      });
    }
    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

export const createBooking = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const {
      session_id,
      customer_name,
      customer_email,
      customer_phone,
      number_of_seats,
    } = req.body;

    if (!session_id || !customer_name || !customer_email || !number_of_seats) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        error: "Tous les champs obligatoires doivent être remplis",
      });
    }

    const session = await Session.findByPk(session_id, { transaction });
    if (!session) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        error: "Session non trouvée",
      });
    }

    if (session.available_seats < number_of_seats) {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        error: `Seulement ${session.available_seats} places disponibles`,
      });
    }

    const total_price = parseFloat(session.price) * number_of_seats;

    let booking_reference = generateBookingReference();
    let referenceExists = await Booking.findOne({
      where: { booking_reference },
    });
    while (referenceExists) {
      booking_reference = generateBookingReference();
      referenceExists = await Booking.findOne({ where: { booking_reference } });
    }

    const booking = await Booking.create(
      {
        session_id,
        customer_name,
        customer_email,
        customer_phone,
        number_of_seats,
        total_price,
        booking_reference,
        status: "confirmed",
      },
      { transaction }
    );

    // Mettre à jour les places disponibles
    await session.update(
      {
        available_seats: session.available_seats - number_of_seats,
      },
      { transaction }
    );

    await transaction.commit();

    const bookingWithDetails = await Booking.findByPk(booking.id, {
      include: [
        {
          model: Session,
          as: "session",
          include: [
            { model: Movie, as: "movie" },
            { model: Salle, as: "salle" },
          ],
        },
      ],
    });

    res.status(201).json({
      success: true,
      message: "Réservation créée avec succès",
      data: bookingWithDetails,
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT - Annuler une réservation
export const cancelBooking = async (req, res) => {
  const transaction = await sequelize.transaction();

  try {
    const booking = await Booking.findByPk(req.params.id, { transaction });
    if (!booking) {
      await transaction.rollback();
      return res.status(404).json({
        success: false,
        error: "Réservation non trouvée",
      });
    }

    if (booking.status === "cancelled") {
      await transaction.rollback();
      return res.status(400).json({
        success: false,
        error: "Cette réservation est déjà annulée",
      });
    }

    // Récupérer la session
    const session = await Session.findByPk(booking.session_id, { transaction });

    // Remettre les places disponibles
    await session.update(
      {
        available_seats: session.available_seats + booking.number_of_seats,
      },
      { transaction }
    );

    // Annuler la réservation
    await booking.update({ status: "cancelled" }, { transaction });

    await transaction.commit();

    res.status(200).json({
      success: true,
      message: "Réservation annulée avec succès",
      data: booking,
    });
  } catch (error) {
    await transaction.rollback();
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE - Supprimer une réservation
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        error: "Réservation non trouvée",
      });
    }

    await booking.destroy();

    res.status(200).json({
      success: true,
      message: "Réservation supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

