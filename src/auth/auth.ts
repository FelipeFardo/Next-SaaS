import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getMembership } from "@/http/members/get-membership";
import { getProfile } from "@/http/profile/get-profile";
import { defineAbilityFor } from "./index";

export async function isAuthenticated() {
  const cookieStore = await cookies();
  return !!cookieStore.get("token")?.value;
}

export async function getCurrentOrg() {
  const cookieStore = await cookies();

  const currentOrg = cookieStore.get("org")?.value;

  if (!currentOrg) {
    redirect("/");
  }

  return currentOrg;
}

export async function getCurrentOrgNullable() {
  const cookieStore = await cookies();

  const currentOrg = cookieStore.get("org")?.value;

  return currentOrg;
}

export async function getCurrentMembership() {
  const org = await getCurrentOrgNullable();

  if (!org) {
    return null;
  }

  const { membership } = await getMembership(org);

  return membership;
}

export async function ability() {
  const membership = await getCurrentMembership();

  if (!membership) {
    return null;
  }

  const ability = defineAbilityFor({
    __typename: "User",
    id: membership.userId,
    role: membership.role,
  });

  return ability;
}

export async function auth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token");

  if (!token) {
    redirect("/auth/sign-in");
  }

  try {
    const { user } = await getProfile();
    return {
      user,
    };
  } catch (_err) {}

  redirect("/api/auth/sign-out");
}
