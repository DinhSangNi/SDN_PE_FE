"use client";
import { ContactForm } from "@/components/ContactForm";
import { useCreateContact } from "@/hooks/contact/useCreateContact";
import { useRouter } from "next/navigation";
import { Contact } from "@/lib/types";

export default function CreateContactPage() {
  const { mutate, isPending } = useCreateContact();
  const router = useRouter();

  const handleSubmit = (data: Omit<Contact, "_id">) => {
    mutate(data, {
      onSuccess: () => {
        router.push("/");
      },
      onError: () => {
        alert("Failed to create contact!");
      },
    });
  };

  return (
    <main className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create New Contact</h1>
      <ContactForm onSubmit={handleSubmit} isPending={isPending} />
    </main>
  );
}
