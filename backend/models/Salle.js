import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Salle = sequelize.define(
  "Salle",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 10,
      },
    },
    features: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: true,
    },
  },
  {
    tableName: "Salles",
    timestamps: true,
  }
);

export default Salle;
