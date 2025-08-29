"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { queryClient } from "@/lib/react-query";
import { createProjectAction } from "./actions";

const projectSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Please, incluide at least 4 characters." }),
  description: z.string(),
});

export type projectSchemaFormData = z.infer<typeof projectSchema>;

export function ProjectForm() {
  const { slug: org } = useParams<{ slug: string }>();

  const {
    handleSubmit,
    setError,
    register,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm<projectSchemaFormData>({
    resolver: zodResolver(projectSchema),
  });

  async function onSubmit({ description, name }: projectSchemaFormData) {
    try {
      await createProjectAction({
        description,
        name,
      });
      queryClient.invalidateQueries({
        queryKey: [org, "projects"],
      });
    } catch (_error) {
      setError("root", {});
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save project failed!</AlertTitle>
          <AlertDescription>
            <p>Save project failed</p>
          </AlertDescription>
        </Alert>
      )}

      {isSubmitSuccessful && (
        <Alert variant="success">
          <AlertTriangle className="size-4" />
          <AlertTitle>Success!</AlertTitle>
          <AlertDescription>
            <p>Project saved!</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Project name</Label>
        <Input {...register("name")} />

        {errors.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="description">Description</Label>
        <Textarea {...register("description")} />

        {errors.description && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.description.message}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Save project"
        )}
      </Button>
    </form>
  );
}
