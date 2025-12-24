import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    director: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    release_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
  },
  {
    tableName: "Movies",
    timestamps: true,
  }
);

export default Movie;
