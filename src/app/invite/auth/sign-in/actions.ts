"use server";

import { cookies } from "next/headers";
import { acceptInvite } from "@/http/invites/accept-invite";
import { signInWithPassword } from "@/http/profile/sign-in-with-password";
import type { signInSchemaFormData } from "./sign-in-form";

export async function signInWithEmailAndPassword(data: signInSchemaFormData) {
  const { email, password } = data;

  const { token } = await signInWithPassword({
    email,
    password,
  });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  const inviteId = cookieStore.get("inviteId")?.value;

  if (inviteId) {
    await acceptInvite(inviteId);
    cookieStore.delete("inviteId");
  }
}
