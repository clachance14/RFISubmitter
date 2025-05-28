"use client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rfiSchema } from "@/schemas/rfi";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type FormValues = z.infer<typeof rfiSchema>;

export default function CreateRfiPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(rfiSchema) });

  const onSubmit = async (values: FormValues) => {
    const res = await fetch("/api/rfi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    let data: any = null;
    try {
      data = await res.json();
    } catch {
      /* response wasn't JSON */
    }
    if (!res.ok) {
      toast.error(data?.error ?? res.statusText);
      return;
    }
    toast.success("RFI created");
    router.push(`/rfi/${data.id}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-4">
      <label className="block">
        <span className="text-sm">Title</span>
        <Input {...register("title")} placeholder="Short RFI title" />
        {errors.title && (
          <span className="text-xs text-red-500">{errors.title.message}</span>
        )}
      </label>
      <Button type="submit" disabled={isSubmitting}>
        Create
      </Button>
    </form>
  );
}
