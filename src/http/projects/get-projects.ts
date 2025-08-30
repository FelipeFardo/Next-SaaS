import { api } from "../api-client";

interface GetProjectsResponse {
  projects: {
    description: string;
    slug: string;
    id: string;
    name: string;
    avatarKey: string | null;
    organizationId: string;
    ownerId: string;
    createdAt: string;
    owner: {
      id: string;
      name: string | null;
      avatarKey: string | null;
    };
  }[];
}

export async function getProjects(org: string) {
  const result = await api
    .get(`organizations/${org}/projects`)
    .json<GetProjectsResponse>();

  return result;
}
