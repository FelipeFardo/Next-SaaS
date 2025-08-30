"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getCurrentOrg } from "@/auth/auth";
import { shutdownOrganization } from "@/http/orgs/shutdown-organization";
import { updateImageOrganization } from "@/http/orgs/update-image-organization";

export async function updateImageOrganizationAction(name: string) {
  const currentOrg = await getCurrentOrg();

  await updateImageOrganization({
    org: currentOrg,
    name,
  });

  revalidateTag("organization");
}

export async function shutdownOrganizationAction() {
  const currentOrg = await getCurrentOrg();

  await shutdownOrganization({ org: currentOrg });

  redirect("/");
}
