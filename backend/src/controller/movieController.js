import Movie from "../models/Movie.js";


export const createMovie = async (req, res) => {
    try {
        const { title, genre, duration, description, director, relase_date, image } = req.body;
        if (!title || !genre || !duration || !description || !director || !relase_date || !image) {
            return res.status(400).json({ error: "All field are required" });
        }
        const movie = await Movie.create({
            title,
            genre,
            duration,
            description,
            director,
            relase_date,
            image,
        });
        res.status(201).json(movie);
    } catch (error) {
        console.error("Error creating movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const getAllMovies = async (req, res) => {
    try {

        const movies = await Movie.findAll();
        res.status(200).json(movies);

    } catch (error) {
        console.error("Error fetching movie", error);
        res.status(500).json({ error: "Internal server error " });
    }
};

export const getMovieById = async (req, res) => {
    try {
        const movie = await Movie.findById(req.params.id);

        res.status(200).json(movie);

    } catch (error) {
        console.error("Error fetching movie:", error);
        res.status(500).json({ error: "Internal server error " });
    }
};

export const updateMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);
        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        await movie.update(req.body);

        res.status(200).json(movie);
    } catch (error) {
        console.error("Error updating movie:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const movie = await Movie.findByPk(id);

        if (!movie) {
            return res.status(404).json({ error: "Movie not found" });
        }
        await movie.destory();
        res.status(200).json({ message: "Movie deleted successfuly" });
    } catch (error) {
        console.error("Error deleting Movie:", error);
        res.status(500).json({ error: "Interval server error" });
    }
};



