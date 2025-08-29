"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import z from "zod";
import githubIcon from "@/assets/github-icon.svg";
import { Button } from "@/components//ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { signInWithGithub } from "../actions";
import { signInWithEmailAndPassword } from "./actions";

const signInSchema = z.object({
  email: z.email({ message: "Please provide a valid email address." }),
  password: z.string().min(1, { message: "Please provide your password." }),
});

export type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: searchParams.get("email") ?? "",
      password: "",
    },
  });

  const onSubmit = async ({ email, password }: SignInFormData) => {
    try {
      const isAuth = await signInWithEmailAndPassword({ email, password });
      if (!isAuth) {
        router.push("/org");
        return;
      }
    } catch (_error) {
      setError("root", {});
      return;
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {errors.root && (
          <Alert variant="destructive">
            <AlertTriangle className="size-4" />
            <AlertTitle>Sign in failed!</AlertTitle>
            <AlertDescription>
              <p>Please try again later</p>
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-1">
          <Label htmlFor="email">E-mail</Label>
          <Input {...register("email")} />
          {errors.email && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.email.message}
            </p>
          )}
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input {...register("password")} type="password" />
          {errors.password && (
            <p className="text-xs font-medium text-red-500 dark:text-red-400">
              {errors.password?.message}
            </p>
          )}
          <Link
            href="/auth/forgot-password"
            className="text-sm font-medium text-foreground hover:underline"
          >
            Forgot your password?
          </Link>
        </div>

        <Button className="w-full" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            "Sign in with email"
          )}
        </Button>

        <Button className="w-full" variant="link" size="sm" asChild>
          <Link href="/auth/sign-up">Create a new account</Link>
        </Button>
      </form>
      <Separator />
      <form action={signInWithGithub}>
        <Button className="w-full" variant="outline" type="submit">
          <Image src={githubIcon} className="mr-2 size-4 dark:invert" alt="" />
          Sign in with GitHub
        </Button>
      </form>
    </div>
  );
}
