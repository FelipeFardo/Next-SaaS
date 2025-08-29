import {
  ArrowLeftRight,
  Crown,
  UserMinus,
  UserRound,
  Users,
} from "lucide-react";
import Image from "next/image";
import { organizationSchema } from "@/auth";

import { ability, getCurrentOrg } from "@/auth/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getMembers } from "@/http/members/get-members";
import { getMembership } from "@/http/members/get-membership";
import { getOrganization } from "@/http/orgs/get-organization";
import { removeMemberAction, transferOwnershipAction } from "./actions";
import { UpdateMemberRoleSelect } from "./update-member-role-select";
import { getIniciais } from "@/lib/get-initials";

export async function MemberList() {
  const currentOrg = await getCurrentOrg();
  const permissions = await ability();

  const [{ membership }, { members }, { organization }] = await Promise.all([
    getMembership(currentOrg),
    getMembers(currentOrg),
    getOrganization(currentOrg),
  ]);

  const authOrganization = organizationSchema.parse(organization);

  return (
    <Card className="shadow-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2">
          <UserRound className="h-5 w-5 text-primary" />
          <CardTitle className="text-xl">Members</CardTitle>
        </div>
        <CardDescription>
          Manage your organization members and their roles
        </CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-hidden">
          <Table>
            <TableBody>
              {members.map((member, index) => {
                const isCurrentUser = member.userId === membership.userId;
                const isOwner = organization.ownerId === member.userId;
                const isLastItem = index === members.length - 1;

                return (
                  <TableRow
                    key={member.id}
                    className={`group hover:bg-muted/50 transition-colors ${
                      !isLastItem ? "border-b" : "border-b-0"
                    }`}
                  >
                    <TableCell className="py-4 pl-6" style={{ width: 72 }}>
                      <div className="relative">
                        <Avatar className="h-10 w-10 ring-2 ring-background shadow-sm">
                          <AvatarFallback>{getIniciais(member?.name ||'')}</AvatarFallback>
                          {member.avatarUrl && (
                            <AvatarImage
                              src={member.avatarUrl}
                              width={40}
                              height={40}
                              alt={`Avatar de ${member.name}`}
                              className="aspect-square size-full object-cover"
                            />
                          )}
                        </Avatar>
                        {isOwner && (
                          <div className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900/50 ring-2 ring-background">
                            <Crown className="h-3 w-3 text-yellow-600 dark:text-yellow-500" />
                          </div>
                        )}
                      </div>
                    </TableCell>

                    <TableCell className="py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-medium text-foreground">
                            {member.name}
                          </span>
                          {isCurrentUser && (
                            <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-2 py-0.5 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-blue-200 dark:ring-blue-800">
                              You
                            </span>
                          )}
                          {isOwner && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 text-xs font-medium text-yellow-700 dark:text-yellow-400 ring-1 ring-yellow-200 dark:ring-yellow-800">
                              <Crown className="h-3 w-3" />
                              Owner
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {member.email}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="py-4 pr-6">
                      <div className="flex items-center justify-end gap-2 flex-wrap">
                        {permissions?.can(
                          "transfer_ownership",
                          authOrganization,
                        ) &&
                          !isCurrentUser &&
                          !isOwner && (
                            <form
                              action={transferOwnershipAction.bind(
                                null,
                                member.userId,
                              )}
                            >
                              <Button
                                size="sm"
                                variant="outline"
                                className="h-9 px-3 text-xs font-medium cursor-pointer"
                              >
                                <ArrowLeftRight className="mr-1.5 h-3.5 w-3.5" />
                                Transfer ownership
                              </Button>
                            </form>
                          )}

                        <UpdateMemberRoleSelect
                          memberId={member.id}
                          value={member.role}
                          disabled={
                            isCurrentUser ||
                            isOwner ||
                            permissions?.cannot("update", "User")
                          }
                        />

                        {permissions?.can("delete", "User") && (
                          <form
                            action={removeMemberAction.bind(null, member.id)}
                          >
                            <Button
                              disabled={isCurrentUser || isOwner}
                              type="submit"
                              size="sm"
                              variant="outline"
                              className="cursor-pointer h-9 px-3 text-xs font-medium text-destructive border-destructive/30 hover:bg-destructive hover:text-destructive-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <UserMinus className="mr-1.5 h-3.5 w-3.5" />
                              Remove
                            </Button>
                          </form>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        {members.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 mb-4">
              <Users className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-900 mb-1">
              No members yet
            </h3>
            <p className="text-sm text-gray-500">
              Start by inviting your first team member
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
