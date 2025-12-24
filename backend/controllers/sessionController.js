import Session from "../models/Session.js";
import Movie from "../models/Movie.js";
import Salle from "../models/Salle.js";

// GET - Toutes les sessions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      include: [
        { model: Movie, as: "movie" },
        { model: Salle, as: "salle" },
      ],
      order: [["start_time", "ASC"]],
    });
    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET - Session par ID
export const getSessionById = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id, {
      include: [
        { model: Movie, as: "movie" },
        { model: Salle, as: "salle" },
      ],
    });
    if (!session) {
      return res.status(404).json({
        success: false,
        error: "Session non trouvée",
      });
    }
    res.status(200).json({
      success: true,
      data: session,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST - Créer une session
export const createSession = async (req, res) => {
  try {
    const { movie_id, salle_id, start_time, end_time, price, available_seats } =
      req.body;

    if (!movie_id || !salle_id || !start_time || !end_time || !price) {
      return res.status(400).json({
        success: false,
        error: "Tous les champs sont obligatoires",
      });
    }

    // Vérifier que le film existe
    const movie = await Movie.findByPk(movie_id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: "Film non trouvé",
      });
    }

    // Vérifier que la salle existe
    const salle = await Salle.findByPk(salle_id);
    if (!salle) {
      return res.status(404).json({
        success: false,
        error: "Salle non trouvée",
      });
    }

    // Si available_seats n'est pas fourni, utiliser la capacité de la salle
    const seats = available_seats || salle.capacity;

    const session = await Session.create({
      movie_id,
      salle_id,
      start_time,
      end_time,
      price,
      available_seats: seats,
    });

    const sessionWithDetails = await Session.findByPk(session.id, {
      include: [
        { model: Movie, as: "movie" },
        { model: Salle, as: "salle" },
      ],
    });

    res.status(201).json({
      success: true,
      data: sessionWithDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT - Modifier une session
export const updateSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: "Session non trouvée",
      });
    }

    await session.update(req.body);

    const updatedSession = await Session.findByPk(session.id, {
      include: [
        { model: Movie, as: "movie" },
        { model: Salle, as: "salle" },
      ],
    });

    res.status(200).json({
      success: true,
      data: updatedSession,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE - Supprimer une session
export const deleteSession = async (req, res) => {
  try {
    const session = await Session.findByPk(req.params.id);
    if (!session) {
      return res.status(404).json({
        success: false,
        error: "Session non trouvée",
      });
    }

    await session.destroy();

    res.status(200).json({
      success: true,
      message: "Session supprimée avec succès",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET - Sessions par film
export const getSessionsByMovie = async (req, res) => {
  try {
    const sessions = await Session.findAll({
      where: { movie_id: req.params.movieId },
      include: [
        { model: Movie, as: "movie" },
        { model: Salle, as: "salle" },
      ],
      order: [["start_time", "ASC"]],
    });
    res.status(200).json({
      success: true,
      count: sessions.length,
      data: sessions,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
