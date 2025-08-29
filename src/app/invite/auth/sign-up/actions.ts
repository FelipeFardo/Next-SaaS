"use server";

import { signUp } from "@/http/sign-up";
import type { SignUpFormData } from "./sign-up-form";

export async function signUpAction(data: SignUpFormData) {
  const { name, email, password } = data;

  await signUp({
    name,
    email,
    password,
  });
}
