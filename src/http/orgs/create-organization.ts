import { api } from "../api-client";

interface CreateOrganizationRequest {
  name: string;
  domain: string | null;
  shouldAttachUsersByDomain: boolean;
}

interface CreateOrganizationResponse {
  organizationId: string;
  organizationSlug: string;
}

export async function createOrganization({
  name,
  domain,
  shouldAttachUsersByDomain,
}: CreateOrganizationRequest): Promise<CreateOrganizationResponse> {
  const result = await api.post("organizations", {
    json: {
      name,
      domain,
      shouldAttachUsersByDomain,
    },
  });

  return result.json();
}
