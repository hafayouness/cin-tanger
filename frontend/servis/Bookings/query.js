// servis/booking/use-bookings.js
// import { useQuery } from "@tanstack/react-query";
// import { getAllBookings } from "./query";

// export const useGetAllBookings = () => {
//   return useQuery({
//     queryKey: ["bookings"],
//     queryFn: getAllBookings,
//   });
// };


import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { 
  createBooking, 
  fetchAllBookings, 
  cancelBookingApi, 
  deleteBookingApi 
} from "./mutation";

export const useGetMyBookings = () => {
  return useQuery({
    queryKey: ["myBookings"],
    queryFn: fetchAllBookings,
    select: (response) => response.data, 
  });
};

export const useCreateBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createBooking,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });
};

export const useCancelBooking = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: cancelBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myBookings"] });
    },
  });
};