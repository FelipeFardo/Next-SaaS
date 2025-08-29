import { Clock, Mail, Trash2, UserRoundPlus } from "lucide-react";
import { ability, getCurrentOrg } from "@/auth/auth";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInvites } from "@/http/invites/get-invites";
import { revokeInviteAction } from "./actions";
import { CreateInviteForm } from "./create-invite-form";

export async function Invites() {
  const currentOrg = await getCurrentOrg();
  const permissions = await ability();

  const { invites } = await getInvites(currentOrg);

  return (
    <div className="space-y-6">
      {permissions?.can("create", "Invite") && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <UserRoundPlus className="h-5 w-5 text-primary" />
              <CardTitle>Invite Member</CardTitle>
            </div>
            <CardDescription className="text-sm">
              Send an invitation to join your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CreateInviteForm />
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Pending Invitations
            <Badge variant="secondary">{invites.length}</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Manage sent invitations
          </p>
        </CardHeader>

        <CardContent className="p-6">
          {invites && invites.length > 0 ? (
            <div className="space-y-3">
              {invites.map((invite) => {
                return (
                  <div
                    key={invite.id}
                    className="flex items-center justify-between p-2 border border-border rounded-lg bg-card hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div className="flex-shrink-0 p-2 bg-muted rounded-full">
                        <Mail className="h-4 w-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{invite.email}</p>
                        <div className="flex items-center gap-2 mt-1 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {invite.role.toLocaleLowerCase()}
                          </Badge>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>Pending</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {permissions?.can?.("delete", "Invite") && (
                      <div className="flex-shrink-0 ml-3">
                        <form action={revokeInviteAction.bind(null, invite.id)}>
                          <Button
                            size="sm"
                            variant="destructive"
                            className="cursor-pointer"
                          >
                            <Trash2 className="size-4" />
                          </Button>
                        </form>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold mb-2">No pending invitations</h3>
              <p className="text-sm text-muted-foreground max-w-sm mx-auto">
                All invitations have been accepted or revoked
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
