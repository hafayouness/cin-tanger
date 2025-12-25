import sequelize from "../config/database.js";

import Movie from "../models/Movie.js";
import Salle from "../models/Salle.js";
import Session from "../models/Session.js";
import Booking from "../models/Booking.js";

const seedAll = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("🧹 Database reset");

    const movies = await Movie.bulkCreate(
      [
        {
          title: "Inception",
          duration: 148,
          description: "Un voleur infiltre les rêves.",
          director: "Christopher Nolan",
          release_date: "2010-07-16",
          image: "inception.jpg",
          type: "Sci-Fi/Thriller",
          rating: 8.8,
        },
        {
          title: "Interstellar",
          duration: 169,
          description: "Voyage spatial pour sauver l'humanité.",
          director: "Christopher Nolan",
          release_date: "2014-11-07",
          image: "interstellar.jpg",
          type: "Sci-Fi/Adventure",
          rating: 8.7,
        },
        {
          title: "The Dark Knight",
          duration: 152,
          description: "Batman contre le Joker.",
          director: "Christopher Nolan",
          release_date: "2008-07-18",
          image: "dark_knight.jpg",
          type: "Action/Crime",
          rating: 9.0,
        },
        {
          title: "Avatar",
          duration: 162,
          description: "Un monde extraterrestre fascinant.",
          director: "James Cameron",
          release_date: "2009-12-18",
          image: "avatar.jpg",
          type: "Sci-Fi/Adventure",
          rating: 7.9,
        },
        {
          title: "Titanic",
          duration: 195,
          description: "Une histoire d'amour tragique.",
          director: "James Cameron",
          release_date: "1997-12-19",
          image: "titanic.jpg",
          type: "Romance/Drama",
          rating: 7.9,
        },
        {
          title: "Gladiator",
          duration: 155,
          description: "Un général romain devenu gladiateur.",
          director: "Ridley Scott",
          release_date: "2000-05-05",
          image: "gladiator.jpg",
          type: "Action/Drama",
          rating: 8.5,
        },
        {
          title: "The Matrix",
          duration: 136,
          description: "La réalité n'est qu'une illusion.",
          director: "Wachowski Sisters",
          release_date: "1999-03-31",
          image: "matrix.jpg",
          type: "Sci-Fi/Action",
          rating: 8.7,
        },
        {
          title: "Joker",
          duration: 122,
          description: "La naissance d'un criminel.",
          director: "Todd Phillips",
          release_date: "2019-10-04",
          image: "joker.jpg",
          type: "Drama/Thriller",
          rating: 8.4,
        },
        {
          title: "Forrest Gump",
          duration: 142,
          description: "Une vie extraordinaire.",
          director: "Robert Zemeckis",
          release_date: "1994-07-06",
          image: "forrest_gump.jpg",
          type: "Drama/Romance",
          rating: 8.8,
        },
        {
          title: "Avengers: Endgame",
          duration: 181,
          description: "La bataille finale des Avengers.",
          director: "Russo Brothers",
          release_date: "2019-04-26",
          image: "endgame.jpg",
          type: "Action/Adventure",
          rating: 8.4,
        },
      ],
      { returning: true }
    );
    console.log("✅ Movies seeded");

    const salles = await Salle.bulkCreate(
      [
        {
          name: "Salle IMAX",
          capacity: 150,
          features: ["IMAX", "Dolby Atmos"],
        },
        {
          name: "Salle 3D",
          capacity: 100,
          features: ["3D"],
        },
        {
          name: "Salle Standard",
          capacity: 80,
          features: [],
        },
      ],
      { returning: true }
    );
    console.log("✅ Salles seeded");

    const sessions = await Session.bulkCreate(
      movies.slice(0, 6).map((movie, index) => ({
        movie_id: movie.id,
        salle_id: salles[index % salles.length].id,
        start_time: `2025-01-1${index + 1} 18:00:00`,
        end_time: `2025-01-1${index + 1} 20:30:00`,
        price: 50 + index * 5,
        available_seats: salles[index % salles.length].capacity,
      })),
      { returning: true }
    );
    console.log("✅ Sessions seeded");

    await Booking.bulkCreate([
      {
        session_id: sessions[0].id,
        customer_name: "Youness Ahafa",
        customer_email: "youness@example.com",
        customer_phone: "0600000000",
        number_of_seats: 2,
        total_price: sessions[0].price * 2,
        status: "confirmed",
        booking_reference: "CINE-1001",
      },
      {
        session_id: sessions[1].id,
        customer_name: "Ahmed Karim",
        customer_email: "ahmed@example.com",
        customer_phone: "0611111111",
        number_of_seats: 1,
        total_price: sessions[1].price,
        status: "pending",
        booking_reference: "CINE-1002",
      },
      {
        session_id: sessions[2].id,
        customer_name: "Sara Benali",
        customer_email: "sara@example.com",
        customer_phone: "0622222222",
        number_of_seats: 3,
        total_price: sessions[2].price * 3,
        status: "confirmed",
        booking_reference: "CINE-1003",
      },
    ]);
    console.log("✅ Bookings seeded");

    console.log("🌱 DATABASE SEEDED SUCCESSFULLY");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding error:", error);
    process.exit(1);
  }
};

seedAll();
