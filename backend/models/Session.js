import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Movie from "./Movie.js";
import Salle from "./Salle.js";

const Session = sequelize.define(
  "Session",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Movie,
        key: "id",
      },
    },
    salle_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Salle,
        key: "id",
      },
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    available_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    tableName: "Sessions",
    timestamps: true,
  }
);

// Relations
Session.belongsTo(Movie, { foreignKey: "movie_id", as: "movie" });
Session.belongsTo(Salle, { foreignKey: "salle_id", as: "salle" });

export default Session;
