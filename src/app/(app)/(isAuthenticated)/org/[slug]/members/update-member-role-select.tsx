"use client";

import type { ComponentProps } from "react";
import type { Role } from "@/auth";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { updateMemberAction } from "./actions";

interface UpdateMemberRoleSelectProps extends ComponentProps<typeof Select> {
  memberId: string;
}

export function UpdateMemberRoleSelect({
  memberId,
  ...props
}: UpdateMemberRoleSelectProps) {
  async function updateMemberRole(role: Role) {
    await updateMemberAction(memberId, role);
  }

  return (
    <Select onValueChange={updateMemberRole} {...props}>
      <SelectTrigger className="h-8 w-32 cursor-pointer">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="ADMIN" className="cursor-pointer">Admin</SelectItem>
        <SelectItem value="MEMBER" className="cursor-pointer">Member</SelectItem>
        <SelectItem value="BILLING" className="cursor-pointer">Billing</SelectItem>
      </SelectContent>
    </Select>
  );
}
