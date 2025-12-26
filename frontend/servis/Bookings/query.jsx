import { useMutation } from "@tanstack/react-query";
import { createBooking } from "./mutation";

export const useCreateBooking = () => {
    return useMutation({
        mutationFn: createBooking,
    });
};
