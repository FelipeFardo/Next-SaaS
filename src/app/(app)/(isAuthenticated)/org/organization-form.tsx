"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createOrganizationAction, updateOrganizationAction } from "./actions";

export const organizationSchema = z
  .object({
    name: z
      .string()
      .min(4, { message: "Please, incluide at least 4 characters." }),
    domain: z
      .string()
      .nullable()
      .transform((value) => (value === "" ? null : value))
      .refine(
        (value) => {
          if (value) {
            const domainRegex = /^[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
            return domainRegex.test(value);
          }

          return true;
        },
        {
          message: "Please, enter a valid domain.",
        },
      ),
    shouldAttachUsersByDomain: z
      .union([z.literal("on"), z.literal("off"), z.boolean()])
      .transform((value) => value === true || value === "on")
      .default(false),
  })
  .refine(
    (data) => {
      if (data.shouldAttachUsersByDomain === true && !data.domain) {
        return false;
      }

      return true;
    },
    {
      message: "Domain is required when auto-join is enabled.",
      path: ["domain"],
    },
  );

export type OrganizationSchemaInput = z.input<typeof organizationSchema>;
export type OrganizationSchemaOutput = z.output<typeof organizationSchema>;

interface OrganizationFormProps {
  isUpdating?: boolean;
  initialData?: OrganizationSchemaOutput;
}

export function OrganizationForm({
  isUpdating = false,
  initialData,
}: OrganizationFormProps) {
  const formAction = isUpdating
    ? updateOrganizationAction
    : createOrganizationAction;

  const {
    setError,
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<OrganizationSchemaInput>({
    defaultValues: initialData,
    resolver: zodResolver(organizationSchema),
  });

  const onSubmit = async ({
    domain,
    name,
    shouldAttachUsersByDomain,
  }: OrganizationSchemaInput) => {
    try {
      await formAction({
        domain,
        name,
        shouldAttachUsersByDomain:
          shouldAttachUsersByDomain === true ||
          shouldAttachUsersByDomain === "on",
      });
    } catch (_error) {
      setError("root", {});
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Save organization failed!</AlertTitle>
          <AlertDescription>
            <p>Save organization failed!</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-1">
        <Label htmlFor="name">Organization name</Label>
        <Input {...register("name")} />

        {errors?.name && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <Label htmlFor="domain">E-mail domain</Label>
        <Input
          {...register("domain")}
          type="text"
          inputMode="url"
          placeholder="example.com"
          defaultValue={initialData?.domain ?? undefined}
        />

        {errors.domain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.domain.message}
          </p>
        )}
      </div>

      <div className="space-y-1">
        <div className="flex items-start space-x-2">
          <div className="translate-y-0.5">
            <Controller
              control={control}
              name="shouldAttachUsersByDomain"
              render={({ field }) => (
                <Checkbox
                  checked={field.value === true || field.value === "on"}
                  onCheckedChange={(checked) => {
                    field.onChange(checked === true);
                  }}
                />
              )}
            />
          </div>
          <label htmlFor="shouldAttachUsersByDomain" className="space-y-1">
            <span className="text-sm font-medium leading-none">
              Auto-join new members
            </span>
            <p className="text-sm text-muted-foreground">
              This will automatically invite all members with same e-mail domain
              to this organization.
            </p>
          </label>
        </div>

        {errors?.shouldAttachUsersByDomain && (
          <p className="text-xs font-medium text-red-500 dark:text-red-400">
            {errors.shouldAttachUsersByDomain.message}
          </p>
        )}
      </div>

      <Button className="w-full" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          "Save organization"
        )}
      </Button>
    </form>
  );
}
