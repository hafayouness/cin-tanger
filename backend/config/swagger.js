import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "CineTanger API",
      version: "1.0.0",
      description:
        "API de réservation de billets de cinéma (Movies, Salles, Sessions, Bookings)",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Local + Docker",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
