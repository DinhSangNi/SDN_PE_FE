import axiosInstance from "@/configs/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: any }) =>
      axiosInstance.patch(`/api/contacts/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["contacts"],
      });
    },
  });
};
