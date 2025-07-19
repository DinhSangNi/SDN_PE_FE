// components/ContactCard.tsx
import { Contact } from "@/lib/types";
import { useDeleteContact } from "@/hooks/contact/useDeleteContact";
import { useRouter } from "next/navigation";

export default function ContactCard({ contact }: { contact: Contact }) {
  const { mutate: deleteContact, isPending } = useDeleteContact();
  const router = useRouter();

  return (
    <div className="p-4 border rounded-lg shadow-sm space-y-2">
      <h2 className="text-lg font-bold">{contact.name}</h2>
      <p className="text-sm">{contact.email}</p>
      {contact.phone && <p className="text-sm">📞 {contact.phone}</p>}
      {contact.group && (
        <p className="text-sm italic">Group: {contact.group.name}</p>
      )}
      <div className="flex gap-2">
        <button
          onClick={() => router.push(`/contacts/${contact._id}/edit`)}
          className="text-blue-600 underline"
        >
          Edit
        </button>
        <button
          onClick={() => deleteContact(contact._id)}
          className="text-red-600 underline"
          disabled={isPending}
        >
          {isPending ? "Deleting..." : "Delete"}
        </button>
      </div>
    </div>
  );
}
