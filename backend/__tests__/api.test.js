import request from "supertest";
import app from "../server.js";

import Session from "../models/Session.js";
import Movie from "../models/Movie.js";
import Salle from "../models/Salle.js";
import Booking from "../models/Booking.js";

beforeAll(async () => {
  await Movie.sequelize.sync();
});

afterAll(async () => {
  await Movie.sequelize.close();
});

describe("🎬 API Integration Tests", () => {
  // -----Movies-----
  describe("Movies API", () => {
    it("GET /api/movies - doit retourner tous les films", async () => {
      const res = await request(app).get("/api/movies");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it("GET /api/movies/:id - doit retourner un film spécifique", async () => {
      const movie = await Movie.findOne();
      const res = await request(app).get(`/api/movies/${movie.id}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(movie.id);
    });

    it("POST /api/movies - doit créer un nouveau film", async () => {
      const newMovie = {
        title: "Test Movie",
        duration: 120,
        description: "Film test",
        director: "Test Director",
        release_date: "2026-01-01",
      };
      const res = await request(app).post("/api/movies").send(newMovie);
      expect(res.status).toBe(201);
      expect(res.body.data.title).toBe("Test Movie");
    });
  });

  // -----Salles-----
  describe("Salles API", () => {
    it("GET /api/salles - retourne toutes les salles", async () => {
      const res = await request(app).get("/api/salles");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("POST /api/salles - crée une salle", async () => {
      const uniqueName = `Salle Test ${Date.now()}`;

      const newSalle = {
        name: uniqueName,
        capacity: 50,
        features: ["Test Feature"],
      };

      const res = await request(app).post("/api/salles").send(newSalle);

      if (res.status !== 201) {
        console.log("❌ Status:", res.status);
        console.log("❌ Body:", JSON.stringify(res.body, null, 2));
      }

      expect(res.status).toBe(201);
      expect(res.body.data.name).toBe(uniqueName);
    });
  });

  // -----Sessions-----
  describe("Sessions API", () => {
    it("GET /api/sessions - retourne toutes les sessions", async () => {
      const res = await request(app).get("/api/sessions");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("POST /api/sessions - crée une session", async () => {
      const movie = await Movie.findOne();
      const salle = await Salle.findOne();
      const newSession = {
        movie_id: movie.id,
        salle_id: salle.id,
        start_time: "2026-01-01 18:00:00",
        end_time: "2026-01-01 20:00:00",
        price: 50,
        available_seats: salle.capacity,
      };
      const res = await request(app).post("/api/sessions").send(newSession);
      expect(res.status).toBe(201);
      expect(res.body.data.movie_id).toBe(movie.id);
    });
  });

  // -----Bookings-----
  describe("Bookings API", () => {
    it("GET /api/bookings - retourne toutes les réservations", async () => {
      const res = await request(app).get("/api/bookings");
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body.data)).toBe(true);
    });

    it("POST /api/bookings - crée une réservation", async () => {
      const session = await Session.findOne();
      const newBooking = {
        session_id: session.id,
        customer_name: "Test User",
        customer_email: "test@example.com",
        customer_phone: "0600000000",
        number_of_seats: 2,
        total_price: session.price * 2,
        status: "pending",
        booking_reference: "TEST-BOOKING-1",
      };
      const res = await request(app).post("/api/bookings").send(newBooking);
      expect(res.status).toBe(201);
      expect(res.body.data.customer_name).toBe("Test User");
    });
  });
});
