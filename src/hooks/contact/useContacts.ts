import { useQuery } from "@tanstack/react-query";
import { contactService } from "@/services/contact.service";

export function useContacts(filters: {
  search?: string;
  groupId?: string;
  sort?: "asc" | "desc";
  page?: number;
  limit?: number;
}) {
  return useQuery({
    queryKey: ["contacts", filters],
    queryFn: async () => await contactService.getContacts(filters),
    staleTime: 3 * 60 * 1000,
  });
}
