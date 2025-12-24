import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Session from "./Session.js";

const Booking = sequelize.define(
  "Booking",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    session_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Session,
        key: "id",
      },
    },
    customer_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    customer_email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    customer_phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    number_of_seats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    total_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    status: {
      type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
      defaultValue: "pending",
    },
    booking_reference: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: false,
    },
  },
  {
    tableName: "Bookings",
    timestamps: true,
  }
);

// Relation
Booking.belongsTo(Session, { foreignKey: "session_id", as: "session" });

export default Booking;
