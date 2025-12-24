import Movie from "../models/Movie.js";

// GET - Tous les films
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll({
      order: [["createdAt", "DESC"]],
    });
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// GET - Film par ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: "Film non trouvé",
      });
    }
    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// POST - Créer un film
export const createMovie = async (req, res) => {
  try {
    const { title, duration, description, director, release_date, image } =
      req.body;

    if (!title || !director) {
      return res.status(400).json({
        success: false,
        error: "Le titre et le réalisateur sont obligatoires",
      });
    }

    const movie = await Movie.create({
      title,
      duration,
      description,
      director,
      release_date,
      image,
    });

    res.status(201).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// PUT - Modifier un film
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: "Film non trouvé",
      });
    }

    await movie.update(req.body);

    res.status(200).json({
      success: true,
      data: movie,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};

// DELETE - Supprimer un film
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: "Film non trouvé",
      });
    }

    await movie.destroy();

    res.status(200).json({
      success: true,
      message: "Film supprimé",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
