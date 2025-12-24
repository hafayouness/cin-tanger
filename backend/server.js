import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";
import cors from "cors";





import movieRoutes from "./routes/movieRouter.js";
import salleRoutes from "./routes/salleRouter.js";
import sessionRoutes from "./routes/sessionRouter.js";
import bookingRoutes from "./routes/bookingRouter.js";
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",sessionRouts)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.get("/", (req, res) => {
  res.json({
    message: "🎬 API Movies - Serveur actif",
    endpoints: {
      movies: "/api/movies",
      health: "/health",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

// Routes API
app.use("/api/movies", movieRoutes);
app.use("/api/salles", salleRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Route non trouvée" });
});

app.use((err, req, res, next) => {
  console.error("❌ Erreur serveur:", err);
  res.status(500).json({
    error: "Erreur interne du serveur",
    message: err.message,
  });
});

// Démarrage du serveur
const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", async () => {
  console.log(`\n${"=".repeat(50)}`);
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📍 URL: http://localhost:${PORT}`);
  console.log(`${"=".repeat(50)}\n`);

  // Tester la connexion à la base de données
  await testConnection();

  console.log(`\n${"=".repeat(50)}`);
  console.log("✅ Application prête à recevoir des requêtes!");
  console.log(`${"=".repeat(50)}\n`);
});
