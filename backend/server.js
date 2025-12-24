import express from "express";
import movieRoutes from "./routes/movieRoutes.js";
import { testConnection } from "./config/database.js";

const app = express();

app.use(express.json());

// Routes
app.use("/movies", movieRoutes);

// Server
const PORT = process.env.PORT || 5000;

const startServer = async () => {
    await testConnection();

    app.listen(PORT, () => {
        console.log(`🚀 Server running on port ${PORT}`);
    });
};

startServer();
