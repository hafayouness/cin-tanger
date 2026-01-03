import { create } from "zustand";
import { fetchAllBookings, deleteBookingApi } from "../servis/Bookings/mutation.js";

const useMyBookingStore = create((set, get) => ({
  bookings: [],
  isLoading: false,
  isError: false,

  fetchBookings: async () => {
    set({ isLoading: true, isError: false });
    try {
      const res = await fetchAllBookings();
      set({ bookings: res.data, isLoading: false });
    } catch (err) {
      console.error(err);
      set({ isError: true, isLoading: false });
    }
  },

  deleteBooking: async (id) => {
    try {
      await deleteBookingApi(id);
      set({ bookings: get().bookings.filter((b) => b.id !== id) });
    } catch (err) {
      console.error("Delete booking error:", err);
    }
  },

  addBooking: (booking) => {
    set({ bookings: [booking, ...get().bookings] });
  },
}));

export default useMyBookingStore;
