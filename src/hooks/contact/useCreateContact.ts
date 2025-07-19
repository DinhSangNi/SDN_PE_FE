import { useMutation, useQueryClient } from "@tanstack/react-query";
import { contactService } from "@/services/contact.service";
import { Contact } from "@/lib/types";

export function useCreateContact() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Omit<Contact, "_id">) =>
      await contactService.createContact(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
}
