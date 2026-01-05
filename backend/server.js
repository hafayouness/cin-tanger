import express from "express";
import { testConnection } from "./config/database.js";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

import movieRoutes from "./routes/movieRouter.js";
import salleRoutes from "./routes/salleRouter.js";
import sessionRoutes from "./routes/sessionRouter.js";
import bookingRoutes from "./routes/bookingRouter.js";

dotenv.config();

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
      salles: "/api/salles",
      sessions: "/api/sessions",
      bookings: "/api/bookings",
      docs: "/api-docs",
      health: "/health",
    },
  });
});

app.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

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

export default app;

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, "0.0.0.0", async () => {
    console.log(`\n${"=".repeat(50)}`);
    console.log(`🚀 Serveur démarré sur le port ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`📚 Swagger Docs: http://localhost:${PORT}/api-docs`);
    console.log(`${"=".repeat(50)}\n`);

    await testConnection();

    console.log(`\n${"=".repeat(50)}`);
    console.log("✅ Application prête à recevoir des requêtes!");
    console.log(`${"=".repeat(50)}\n`);
  });
}
