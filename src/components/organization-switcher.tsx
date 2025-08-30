import { ChevronsUpDown, PlusCircle } from "lucide-react";
import Link from "next/link";

import { getCurrentOrgNullable } from "@/auth/auth";
import { getOrganizations } from "@/http/orgs/get-organizations";
import { AvatarImage } from "./avatar-image";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export async function OrganizationSwitcher() {
  const currentOrg = await getCurrentOrgNullable();

  const { organizations } = await getOrganizations();

  const currentOrganization = organizations.find(
    (org) => org.slug === currentOrg,
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex cursor-pointer w-[168px] items-center gap-2 rounded p-1 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-primary">
        {currentOrganization ? (
          <>
            <Avatar className="size-4">
              {currentOrganization.avatarKey && (
                <AvatarImage src={currentOrganization.avatarKey} />
              )}
              <AvatarFallback />
            </Avatar>
            <span className="truncate text-left">
              {currentOrganization.name}
            </span>
          </>
        ) : (
          <span className="text-muted-foreground">Select organization</span>
        )}
        <ChevronsUpDown className="ml-auto size-4 text-muted-foreground" />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        alignOffset={-16}
        sideOffset={12}
        className="w-[200px]"
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel>Organizations</DropdownMenuLabel>
          {organizations.map((organization) => {
            return (
              <DropdownMenuItem key={organization.id} asChild>
                <Link
                  href={`/org/${organization.slug}`}
                  className="cursor-pointer my-1"
                >
                  <Avatar className="mr-2 size-4">
                    {organization.avatarKey && (
                      <AvatarImage src={organization.avatarKey} />
                    )}
                    <AvatarFallback />
                  </Avatar>
                  <span className="line-clamp-1">{organization.name}</span>
                </Link>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/create-organization" className="cursor-pointer">
            <PlusCircle className="mr-2 size-4" />
            Create new
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
