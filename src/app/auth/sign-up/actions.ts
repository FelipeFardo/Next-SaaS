"use server";

import { signUp } from "@/http/profile/sign-up";
import type { SignUpFormData } from "./sign-up-form";

export async function signUpAction({ email, name, password }: SignUpFormData) {
  await signUp({
    name,
    email,
    password,
  });
}
