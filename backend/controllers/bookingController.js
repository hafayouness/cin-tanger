import Booking from "../models/Movie.js";
import Salle from "../models/Salle.js";
import Session from "../models/Session.js";

export const createBooking = async (req, res) => {
    try {
        const { session_id, seats, customer_name, } = req.body;

        if (!session_id || !seats || !customer_name) {
            return res.status(400).json({ error: "session_id, seats, customer_name  are required", });
        }
        if (seats <= 0) {
            return res.status(400).json({ error: "Seats must be greater than 0", });
        }
        const session = await Session.findByPk(session_id, {
            include: Salle,
        });
        if (!session) {
            return res.status(404).json({ error: "Session not found" });
        }
        const salleCapacity = session.Salle.capacity;
        const totalBooked = await Booking.sum("seats", {
            where: { session_id }
            ,
        });
        const bookedSeats = totalBooked || 0;
        const avaibleSeats = salleCapacity - bookedSeats;

        if (seats > avaibleSeats) {
            return res.status(400).json({
                error: `Only ${avaibleSeats} seats available`,
            });
        }

        const booking = await Booking.create({
            session_id,
            seats,
            customer_name,
        });

        res.status(201).json({
            message: "Booking created successfully",
            booking,
            avaibleSeats: avaibleSeats - seats,
        });
    } catch (error) {
        console.error("Error creating booking:", error);
        res.status(500).json({ error })
    }
}
