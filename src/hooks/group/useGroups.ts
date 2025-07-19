import { useQuery } from "@tanstack/react-query";
import { groupService } from "@/services/group.service";

export const useGroups = () => {
  return useQuery({
    queryKey: ["groups"],
    queryFn: () => groupService.getGroups(),
    staleTime: 3 * 60 * 1000,
  });
};
