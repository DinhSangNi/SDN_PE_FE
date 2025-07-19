"use client";

import ContactCard from "@/components/ContactCard";
import { useContacts } from "@/hooks/contact/useContacts";
import { Contact, Group } from "@/lib/types";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useGroups } from "@/hooks/group/useGroups";

export default function HomePage() {
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [groupFilter, setGroupFilter] = useState<string | undefined>(undefined);
  const [sortAsc, setSortAsc] = useState(true);
  const router = useRouter();

  const { data, isLoading, isError } = useContacts({
    search,
    groupId: groupFilter ? groupFilter : undefined,
    sort: sortAsc ? "asc" : "desc",
  });

  const { data: groups } = useGroups();

  const contacts = isLoading ? [] : data?.data;

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contact List</h1>
        <button
          onClick={() => router.push("/contacts/create")}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
        >
          + New Contact
        </button>
      </div>

      <input
        type="text"
        placeholder="Search by name..."
        className="w-full p-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        className="w-full p-2 border rounded"
        value={groupFilter}
        onChange={(e) => setGroupFilter(e.target.value)}
      >
        <option value="">All Groups</option>
        {groups?.map((g: Group) => (
          <option key={g._id} value={g._id}>
            {g.name}
          </option>
        ))}
      </select>

      <button
        className="text-blue-600 underline"
        onClick={() => setSortAsc((prev) => !prev)}
      >
        Sort: {sortAsc ? "A-Z" : "Z-A"}
      </button>

      {isLoading ? (
        <p>Loading...</p>
      ) : isError ? (
        <p className="text-red-600">Failed to load contacts.</p>
      ) : !contacts || contacts.length === 0 ? (
        <p>No contacts found.</p>
      ) : (
        <div className="grid gap-3">
          {contacts?.map((c: Contact) => (
            <ContactCard key={c._id} contact={c} />
          ))}
        </div>
      )}
    </main>
  );
}
