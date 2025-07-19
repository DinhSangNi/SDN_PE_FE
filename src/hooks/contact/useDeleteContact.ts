// hooks/contact/useDeleteContact.ts
import axiosInstance from "@/configs/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axiosInstance.delete(`/contacts/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
