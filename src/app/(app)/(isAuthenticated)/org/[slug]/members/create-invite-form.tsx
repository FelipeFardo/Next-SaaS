"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, CheckCircle, Loader2, UserPlus } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { roleSchema } from "@/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createInviteAction } from "./actions";

const inviteSchema = z.object({
  email: z.email({ message: "Please enter a valid email." }),
  role: roleSchema,
});

export type InviteFormData = z.infer<typeof inviteSchema>;

export function CreateInviteForm() {
  const [success, setSuccess] = useState(false);

  const {
    control,
    register,
    setError,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      role: "MEMBER",
    },
  });

  async function onSubmit({ email, role }: InviteFormData) {
    try {
      setSuccess(false);
      await createInviteAction({ email, role });
      setSuccess(true);
      reset();

      // Oculta a mensagem de sucesso após 3s
      setTimeout(() => setSuccess(false), 3000);
    } catch {
      setError("root", {
        message: "Failed to send invite. Please try again.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {errors.root && (
        <Alert variant="destructive">
          <AlertTriangle className="size-4" />
          <AlertTitle>Error sending invite</AlertTitle>
          <AlertDescription>
            {errors.root.message ?? "Something went wrong. Please try again."}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert variant="default">
          <CheckCircle className="size-4" />
          <AlertTitle>Invite sent!</AlertTitle>
          <AlertDescription>The invite was successfully sent.</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email address</Label>
          <Input
            id="email"
            type="email"
            placeholder="exemplo@dominio.com"
            disabled={isSubmitting}
            aria-invalid={!!errors.email}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={isSubmitting}
              >
                <SelectTrigger id="role" className="w-full py-6">
                  <SelectValue placeholder="Selecione uma função" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ADMIN">
                    <div className="flex flex-col">
                      <span>Administrator</span>
                      <span className="text-xs text-muted-foreground">
                        Full access to all features
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="MEMBER">
                    <div className="flex flex-col">
                      <span>Member</span>
                      <span className="text-xs text-muted-foreground">
                        Standard access to features
                      </span>
                    </div>
                  </SelectItem>
                  <SelectItem value="BILLING">
                    <div className="flex flex-col">
                      <span>Billing</span>
                      <span className="text-xs text-muted-foreground">
                        Access to charges and payments
                      </span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Botão de envio */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Sending invite...
            </>
          ) : (
            <>
              <UserPlus className="mr-2 size-4" />
              Send invite
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
