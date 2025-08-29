"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { acceptInvite } from "@/http/invites/accept-invite";
import { signInWithPassword } from "@/http/profile/sign-in-with-password";
import type { SignInFormData } from "./sign-in-form";

export async function signInWithEmailAndPassword(data: SignInFormData) {
  const { email, password } = data;

  const { token } = await signInWithPassword({
    email,
    password,
  });

  const cookiesStore = await cookies();
  cookiesStore.set("token", token, {
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  const inviteId = cookiesStore.get("inviteId")?.value;

  if (inviteId) {
    try {
      await acceptInvite(inviteId);
      cookiesStore.delete("inviteId");
    } catch (e) {
      console.log(e);
    }
  }

  return true;
}
