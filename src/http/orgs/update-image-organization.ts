import { api } from "../api-client";

interface UpdateImageOrganizationRequest {
  name: string;
  org: string;
}

export async function updateImageOrganization({
  name,
  org,
}: UpdateImageOrganizationRequest): Promise<void> {
  await api.patch(`organizations/${org}/avatar-url`, {
    json: {
      imageName: name,
    },
  });
}
