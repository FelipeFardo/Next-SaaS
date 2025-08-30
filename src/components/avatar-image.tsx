import { env } from "@/env";
import { cn } from "@/lib/utils";
import { AvatarImage as AvatarImagePrimitive } from "./ui/avatar";

export function AvatarImage({
  src,
  className,
  ...props
}: React.ComponentProps<typeof AvatarImagePrimitive>) {
  console.log(`${env.NEXT_PUBLIC_CLOUDFLARE_BUCKET_PUBLIC_URL}/${src}`);
  return (
    <AvatarImagePrimitive
      data-slot="avatar-image"
      src={
        src
          ? `${env.NEXT_PUBLIC_CLOUDFLARE_BUCKET_PUBLIC_URL}/${src}`
          : undefined
      }
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}
