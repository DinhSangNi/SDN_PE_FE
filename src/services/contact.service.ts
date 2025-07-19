import axiosInstance from "@/configs/axios";
import { Contact } from "@/lib/types";

export const contactService = {
  async createContact(data: Omit<Contact, "_id">): Promise<Contact> {
    const res = await axiosInstance.post<Contact>("/contacts", data);
    return res.data;
  },

  async getContacts(params?: {
    search?: string;
    group?: string;
    sort?: "asc" | "desc";
    page?: number;
    limit?: number;
  }) {
    const res = await axiosInstance.get("/contacts", { params });
    return res.data;
  },
};
