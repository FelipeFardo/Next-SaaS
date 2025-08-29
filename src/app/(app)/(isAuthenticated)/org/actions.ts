"use server";

import { revalidateTag } from "next/cache";
import { getCurrentOrg } from "@/auth/auth";
import { createOrganization } from "@/http/orgs/create-organization";
import { updateOrganization } from "@/http/orgs/update-organization";
import type { OrganizationSchemaOutput } from "./organization-form";

export async function createOrganizationAction(data: OrganizationSchemaOutput) {
  const { name, domain, shouldAttachUsersByDomain } = data;

  await createOrganization({
    name,
    domain,
    shouldAttachUsersByDomain,
  });

  revalidateTag("organizations");
}

export async function updateOrganizationAction(data: OrganizationSchemaOutput) {
  const currentOrg = await getCurrentOrg();

  const { name, domain, shouldAttachUsersByDomain } = data;

  await updateOrganization({
    org: currentOrg,
    name,
    domain,
    shouldAttachUsersByDomain,
  });

  revalidateTag("organizations");
}
