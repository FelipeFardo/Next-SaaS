import { api } from "../api-client";

interface UpdateImageOrganizationRequest {
  url: string;
  org: string;
}

export async function updateImageOrganization({
  url,
  org,
}: UpdateImageOrganizationRequest): Promise<void> {
  await api.patch(`organizations/${org}/avatar-url`, {
    json: {
      imageUrl: url,
    },
  });
}
