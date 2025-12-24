import express from "express";
import dotenv from "dotenv";
import { testConnection } from "./config/database.js";
import cors from "cors";
import sessionRouts from "./routes/sessionRouter.js"

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api",sessionRouts)
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", async () => {
  await testConnection();
  console.log(`🚀 Serveur démarré sur ${PORT}`);
});
