"use server";

import { getCurrentOrg } from "@/auth/auth";
import { createProject } from "@/http/projects/create-project";
import type { projectSchemaFormData } from "./project-form";

export async function createProjectAction(data: projectSchemaFormData) {
  const { name, description } = data;

  await createProject({
    org: await getCurrentOrg(),
    name,
    description,
  });
}
