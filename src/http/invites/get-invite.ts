import type { Role } from "@/auth";

import { api } from "../api-client";

interface GetInviteResponse {
  invite: {
    id: string;
    role: Role;
    email: string;
    createdAt: string;
    organization: {
      name: string;
    };
    author: {
      id: string;
      name: string | null;
      avatarKey: string | null;
    } | null;
  };
}

export async function getInvite(inviteId: string) {
  const result = await api.get(`invites/${inviteId}`).json<GetInviteResponse>();

  return result;
}
