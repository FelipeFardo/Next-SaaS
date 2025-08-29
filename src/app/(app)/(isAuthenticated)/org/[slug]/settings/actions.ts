"use server";

import { revalidateTag } from "next/cache";
import { getCurrentOrg } from "@/auth/auth";
import { updateImageOrganization } from "@/http/orgs/update-image-organization";
import { shutdownOrganization } from "@/http/orgs/shutdown-organization";
import { redirect } from "next/navigation";

export async function updateImageOrganizationAction(url: string) {
  const currentOrg = await getCurrentOrg();

  await updateImageOrganization({
    org: currentOrg,
    url,
  });

  revalidateTag("organization");
}


export  async function shutdownOrganizationAction() {


    const currentOrg = await getCurrentOrg();

    await shutdownOrganization({ org: currentOrg });

    redirect("/");
  }