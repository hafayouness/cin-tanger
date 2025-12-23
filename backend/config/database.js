import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  dialect: "postgres",
  logging: true,
});

const testConnection = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log("✅ Connexion à PostgreSQL réussie!");
  } catch (error) {
    console.error("❌ Erreur DB:", error.message);
    process.exit(1);
  }
};

export default sequelize;
export { testConnection };
