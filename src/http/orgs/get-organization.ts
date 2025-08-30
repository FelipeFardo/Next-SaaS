import { api } from "../api-client";

export interface GetOrganizationResponse {
  organization: {
    slug: string;
    id: string;
    name: string;
    domain: string | null;
    shouldAttachUsersByDomain: boolean;
    avatarKey: string | null;
    createdAt: string;
    updatedAt: string;
    ownerId: string;
  };
}

export async function getOrganization(org: string) {
  const result = await api
    .get(`organizations/${org}`, {
      next: {
        tags: ["organization"],
      },
    })
    .json<GetOrganizationResponse>();

  return result;
}
