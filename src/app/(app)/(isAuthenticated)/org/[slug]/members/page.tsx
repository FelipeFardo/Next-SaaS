import { ability } from "@/auth/auth";
import { Invites } from "./invites";
import { MemberList } from "./member-list";

export default async function MembersPage() {
  const permissions = await ability();

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {permissions?.can("get", "User") && <MemberList />}
        </div>

        <div className="space-y-6">
          {permissions?.can("get", "Invite") && <Invites />}
        </div>
      </div>
    </div>
  );
}
