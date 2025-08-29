"use client";

import { useState } from "react";
import { XCircle } from "lucide-react";
import { useParams } from "next/navigation";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { shutdownOrganizationAction } from "./actions";

export function ShutdownOrganizationButton() {
  const [confirmation, setConfirmation] = useState("");

  const {slug: orgSlug} = useParams<{slug:string}>()
  const requiredText = `delete ${orgSlug}`;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="destructive" className="w-56">
          <XCircle className="mr-2 size-4" />
          Shutdown organization
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. It will permanently delete your
            organization and remove its data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="space-y-2 py-4">
          <p className="text-sm text-muted-foreground">
            To confirm, type <code className="font-mono">{requiredText}</code> below:
          </p>
          <Input
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            placeholder="Type here..."
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form action={shutdownOrganizationAction}>
            <Button
              type="submit"
              variant="destructive"
              className="w-56"
              disabled={confirmation !== requiredText}
            >
              Shutdown organization
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
