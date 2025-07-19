import axiosInstance from "@/configs/axios";
import { Group } from "@/lib/types";

export const groupService = {
  async getGroups(): Promise<Group[]> {
    const res = await axiosInstance.get("/groups");
    return res.data;
  },
};
