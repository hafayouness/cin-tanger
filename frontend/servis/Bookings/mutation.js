// import { instance } from "../instance";

// export const createBooking = async (payload) => {
//     const response = await instance.post("/bookings", payload);
//     return response.data;
// };


import { instance } from "../instance.js";

export const fetchAllBookings = async () => {
    const response = await instance.get("/api/bookings");
    return response.data;
};

export const createBooking = async (bookingData) => {
    const response = await instance.post("/api/bookings", bookingData);
    return response.data;
};

export const cancelBookingApi = async (id) => {
    const response = await instance.put(`/api/bookings/cancel/${id}`);
    return response.data;
};

export const deleteBookingApi = async (id) => {
    const response = await instance.delete(`/api/bookings/${id}`);
    return response.data;
};
