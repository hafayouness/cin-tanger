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
          image:
            "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
          type: "Sci-Fi",
          rating: 8.8,
        },
        {
          title: "Interstellar",
          duration: 169,
          description: "Voyage spatial pour sauver l'humanité.",
          director: "Christopher Nolan",
          release_date: "2014-11-07",
          image:
            "https://m.media-amazon.com/images/M/MV5BZjdkOTU3MDktN2IxOS00OGEyLWFmMjktY2FiMmZkNWIyODZiXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_SX300.jpg",
          type: "Sci-Fi",
          rating: 8.7,
        },
        {
          title: "The Dark Knight",
          duration: 152,
          description: "Batman contre le Joker.",
          director: "Christopher Nolan",
          release_date: "2008-07-18",
          image:
            "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg",
          type: "Action",
          rating: 9.0,
        },
        {
          title: "Avatar",
          duration: 162,
          description: "Un monde extraterrestre fascinant.",
          director: "James Cameron",
          release_date: "2009-12-18",
          image:
            "https://m.media-amazon.com/images/M/MV5BZDA0OGQxNTItMDZkMC00N2UyLTg3MzMtYTJmNjg3Nzk5MzRiXkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
          type: "Sci-Fi",
          rating: 7.9,
        },
        {
          title: "Titanic",
          duration: 195,
          description: "Une histoire d'amour tragique.",
          director: "James Cameron",
          release_date: "1997-12-19",
          image:
            "https://m.media-amazon.com/images/M/MV5BMDdmZGU3NDQtY2E5My00ZTliLWIzOTUtMTY4ZGI1YjdiNjk3XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg",
          type: "Romance",
          rating: 7.9,
        },
        {
          title: "Gladiator",
          duration: 155,
          description: "Un général romain devenu gladiateur.",
          director: "Ridley Scott",
          release_date: "2000-05-05",
          image:
            "https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
          type: "Action",
          rating: 8.5,
        },
        {
          title: "The Matrix",
          duration: 136,
          description: "La réalité n'est qu'une illusion.",
          director: "Wachowski Sisters",
          release_date: "1999-03-31",
          image:
            "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
          type: "Sci-Fi",
          rating: 8.7,
        },
        {
          title: "Joker",
          duration: 122,
          description: "La naissance d'un criminel.",
          director: "Todd Phillips",
          release_date: "2019-10-04",
          image:
            "https://m.media-amazon.com/images/M/MV5BNGVjNWI4ZGUtNzE0MS00YTJmLWE0ZDctN2ZiYTk2YmI3NTYyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
          type: "Drama",
          rating: 8.4,
        },
        {
          title: "Forrest Gump",
          duration: 142,
          description: "Une vie extraordinaire.",
          director: "Robert Zemeckis",
          release_date: "1994-07-06",
          image:
            "https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
          type: "Drama",
          rating: 8.8,
        },
        {
          title: "Avengers: Endgame",
          duration: 181,
          description: "La bataille finale des Avengers.",
          director: "Russo Brothers",
          release_date: "2019-04-26",
          image:
            "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg",
          type: "Action",
          rating: 8.4,
        },
        {
          title: "Pulp Fiction",
          duration: 154,
          description: "Des histoires entrelacées dans le crime.",
          director: "Quentin Tarantino",
          release_date: "1994-10-14",
          image:
            "https://m.media-amazon.com/images/M/MV5BNGNhMDIzZTUtNTBlZi00MTRlLWFjM2ItYzViMjE3YzI5MjljXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
          type: "Crime",
          rating: 8.9,
        },
        {
          title: "The Shawshank Redemption",
          duration: 142,
          description: "L'espoir dans une prison.",
          director: "Frank Darabont",
          release_date: "1994-09-23",
          image:
            "https://m.media-amazon.com/images/M/MV5BNDE3ODcxYzMtY2YzZC00NmNlLWJiNDMtZDViZWM2MzIxZDYwXkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_SX300.jpg",
          type: "Drama",
          rating: 9.3,
        },
        {
          title: "The Godfather",
          duration: 175,
          description: "La saga d'une famille mafieuse.",
          director: "Francis Ford Coppola",
          release_date: "1972-03-24",
          image:
            "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg",
          type: "Crime",
          rating: 9.2,
        },
        {
          title: "Fight Club",
          duration: 139,
          description: "Un club de combat clandestin.",
          director: "David Fincher",
          release_date: "1999-10-15",
          image:
            "https://m.media-amazon.com/images/M/MV5BNDIzNDU0YzEtYzE5Ni00ZjlkLTk5ZjgtNjM3NWE4YzA3Nzk3XkEyXkFqcGdeQXVyMjUzOTY1NTc@._V1_SX300.jpg",
          type: "Drama",
          rating: 8.8,
        },
        {
          title: "The Lion King",
          duration: 88,
          description: "Un lionceau devient roi.",
          director: "Roger Allers, Rob Minkoff",
          release_date: "1994-06-24",
          image:
            "https://m.media-amazon.com/images/M/MV5BYTYxNGMyZTYtMjE3MS00MzNjLWFjNmYtMDk3N2FmM2JiM2M1XkEyXkFqcGdeQXVyNjY5NDU4NzI@._V1_SX300.jpg",
          type: "Animation",
          rating: 8.5,
        },
        {
          title: "Spider-Man: No Way Home",
          duration: 148,
          description: "Spider-Man face au multivers.",
          director: "Jon Watts",
          release_date: "2021-12-17",
          image:
            "https://m.media-amazon.com/images/M/MV5BZWMyYzFjYTYtNTRjYi00OGExLWE2YzgtOGRmYjAxZTU3NzBiXkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_SX300.jpg",
          type: "Action",
          rating: 8.2,
        },
        {
          title: "Dune",
          duration: 155,
          description: "Une planète désertique et des intrigues.",
          director: "Denis Villeneuve",
          release_date: "2021-10-22",
          image:
            "https://m.media-amazon.com/images/M/MV5BN2FjNmEyNWMtYzM0ZS00NjIyLTg5YzYtYThlMGVjNzE1OGViXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
          type: "Sci-Fi",
          rating: 8.0,
        },
        {
          title: "Toy Story",
          duration: 81,
          description: "Des jouets prennent vie.",
          director: "John Lasseter",
          release_date: "1995-11-22",
          image:
            "https://m.media-amazon.com/images/M/MV5BMDU2ZWJlMjktMTRhMy00ZTA5LWEzNDgtYmNmZTEwZTViZWJkXkEyXkFqcGdeQXVyNDQ2OTk4MzI@._V1_SX300.jpg",
          type: "Comedy",
          rating: 8.3,
        },
        {
          title: "Parasite",
          duration: 132,
          description: "Une famille s'infiltre chez les riches.",
          director: "Bong Joon Ho",
          release_date: "2019-05-30",
          image:
            "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
          type: "Drama/Thriller",
          rating: 8.5,
        },
        {
          title: "Oppenheimer",
          duration: 180,
          description: "L'histoire du père de la bombe atomique.",
          director: "Christopher Nolan",
          release_date: "2023-07-21",
          image:
            "https://m.media-amazon.com/images/M/MV5BMDBmYTZjNjUtN2M1MS00MTQ2LTk2ODgtNzc2M2QyZGE5NTVjXkEyXkFqcGdeQXVyNzAwMjU2MTY@._V1_SX300.jpg",
          type: "Biography",
          rating: 8.3,
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
