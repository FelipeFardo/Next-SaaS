"use server";

import { revalidateTag } from "next/cache";
import { z } from "zod";
import { type Role, roleSchema } from "@/auth";

import { getCurrentOrg } from "@/auth/auth";
import { createInvite } from "@/http/invites/create-invite";
import { revokeInvite } from "@/http/invites/revoke-invite";
import { removeMember } from "@/http/members/remove-member";
import { updateMember } from "@/http/members/update-member";
import { transferOwnership } from "@/http/orgs/transfer-ownership";

const inviteSchema = z.object({
  email: z.string().email({ message: "Invalid e-mail address." }),
  role: roleSchema,
});

export type inviteFormData = z.infer<typeof inviteSchema>;

export async function createInviteAction(data: inviteFormData) {
  const currentOrg = await getCurrentOrg();

  const { email, role } = data;

  await createInvite({
    org: currentOrg,
    email,
    role,
  });

  revalidateTag(`${currentOrg}/invites`);
}

export async function removeMemberAction(memberId: string) {
  const currentOrg = await getCurrentOrg();

  await removeMember({
    org: currentOrg,
    memberId,
  });

  revalidateTag(`${currentOrg}/members`);
}

export async function updateMemberAction(memberId: string, role: Role) {
  const currentOrg = await getCurrentOrg();

  await updateMember({
    org: currentOrg,
    memberId,
    role,
  });

  revalidateTag(`${currentOrg}/members`);
}

export async function revokeInviteAction(inviteId: string) {
  const currentOrg = await getCurrentOrg();

  await revokeInvite({
    org: currentOrg,
    inviteId,
  });

  revalidateTag(`${currentOrg}/invites`);
}
export async function transferOwnershipAction(memberId: string) {
  const currentOrg = await getCurrentOrg();

  await transferOwnership({
    org: currentOrg,
    transferToUserId: memberId,
  });
  revalidateTag(`${currentOrg}/members`);
}
