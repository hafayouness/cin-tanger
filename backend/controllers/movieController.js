import Movie from "../models/Movie.js";

// CREATE
export const createMovie = async (req, res) => {
    try {
        const {
            title,
            genre,
            duration,
            description,
            director,
            release_date,
            image,
        } = req.body;

        if (!genre || !director) {
            return res.status(400).json({
                error: "genre et director sont obligatoires",
            });
        }

        const movie = await Movie.create({
            title,
            genre,
            duration,
            description,
            director,
            release_date,
            image,
        });

        res.status(201).json(movie);
    } catch (error) {
        console.error("❌ Create movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// READ ALL
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movie.findAll();
        res.status(200).json(movies);
    } catch (error) {
        console.error("❌ Get movies:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// READ ONE
export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        res.status(200).json(movie);
    } catch (error) {
        console.error("❌ Get movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// UPDATE
export const updateMovie = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        await movie.update(req.body);
        res.status(200).json(movie);
    } catch (error) {
        console.error("❌ Update movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// DELETE
export const deleteMovie = async (req, res) => {
    try {
        const movie = await Movie.findByPk(req.params.id);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }

        await movie.destroy();
        res.status(200).json({ message: "Movie deleted successfully" });
    } catch (error) {
        console.error("❌ Delete movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
