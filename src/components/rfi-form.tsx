"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { rfiSchema, type RfiInput } from "@/schemas/rfi";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/form-message";

export default function RfiForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RfiInput>({
    resolver: zodResolver(rfiSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: RfiInput) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/rfi", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create RFI");
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An unknown error occurred",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          RFI Title
        </label>
        <Input
          id="title"
          {...register("title")}
          placeholder="Enter RFI title"
          className={errors.title ? "border-red-500" : ""}
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {submitError && <FormMessage type="error" message={submitError} />}
      {submitSuccess && (
        <FormMessage type="success" message="RFI created successfully!" />
      )}

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Create RFI"}
      </Button>
    </form>
  );
}
