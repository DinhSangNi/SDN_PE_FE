"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Contact } from "@/lib/types";
import { Controller, useForm } from "react-hook-form";
import { GroupSelect } from "./GroupSelect";

type Props = {
  onSubmit: (data: {
    name: string;
    email: string;
    phone?: string;
    groupName?: string;
  }) => void;
  isPending?: boolean;
  defaultValues?: {
    name: string;
    email: string;
    phone?: string;
    group?: { _id: string; name: string } | string | null;
  };
  type: "create" | "edit";
};

// Zod schema
const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional(),
  groupName: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function ContactForm({
  onSubmit,
  isPending,
  defaultValues,
  type = "create",
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      groupName:
        typeof defaultValues?.group === "string"
          ? defaultValues.group
          : defaultValues?.group?.name || "", // nếu object thì lấy _id
    },
  });

  const onValidSubmit = (data: FormData) => {
    console.log("data: ", data);
    onSubmit({
      ...data,
      phone: data.phone || undefined,
      groupName: data.groupName || undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-4">
      <div>
        <input
          {...register("name")}
          placeholder="Name"
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          {...register("phone")}
          placeholder="Phone (optional)"
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <Controller
          name="groupName"
          control={control}
          render={({ field }) => (
            <GroupSelect value={field.value} onChange={field.onChange} />
          )}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded w-full disabled:opacity-50 cursor-pointer"
        disabled={isPending}
      >
        {type === "create"
          ? isPending
            ? "Creating... "
            : "Create"
          : isPending
          ? "Saving"
          : "Save"}
      </button>
    </form>
  );
}
