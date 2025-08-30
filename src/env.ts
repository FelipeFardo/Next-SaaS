import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url(),
  NEXT_PUBLIC_CLOUDFLARE_BUCKET_PUBLIC_URL: z.url(),
});

const variables = {
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_CLOUDFLARE_BUCKET_PUBLIC_URL:
    process.env.NEXT_PUBLIC_CLOUDFLARE_BUCKET_PUBLIC_URL,
};

export const env = envSchema.parse(variables);
