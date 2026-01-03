import { instance } from "../instance";

export const createBooking = async (payload) => {
    const response = await instance.post("/bookings", payload);
    return response.data;
};
