"use client";

import { useRouter, useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useUpdateContact } from "@/hooks/contact/useUpdateContact";
import { ContactForm } from "@/components/ContactForm";
import axiosInstance from "@/configs/axios";

export default function EditContactPage() {
  const router = useRouter();
  const { id } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["contacts", id],
    queryFn: () => axiosInstance.get(`/contacts/${id}`).then((res) => res.data),
    enabled: !!id,
  });

  const { mutate, isPending } = useUpdateContact();

  const handleSubmit = (formData: any) => {
    mutate(
      { id: id! as string, data: formData },
      {
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  if (isLoading || !data) return <p>Loading...</p>;

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Contact</h1>
      <ContactForm
        type="edit"
        onSubmit={handleSubmit}
        isPending={isPending}
        defaultValues={data}
      />
    </main>
  );
}
