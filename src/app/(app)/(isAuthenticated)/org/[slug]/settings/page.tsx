import { Building2, CreditCard, Image, Trash2 } from "lucide-react";
import { organizationSchema } from "@/auth";
import { ability, getCurrentOrg } from "@/auth/auth";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getOrganization } from "@/http/orgs/get-organization";
import { OrganizationForm } from "../../organization-form";
import { Billing } from "./billing";
import { OrganizationImageForm } from "./organization-image-form";
import { ShutdownOrganizationButton } from "./shutdown-organization-button";

export default async function Settings() {
  const currentOrg = await getCurrentOrg();
  const permissions = await ability();
  const { organization } = await getOrganization(currentOrg);

  const authOrganization = organizationSchema.parse(organization);
  const canUpdateOrganization = permissions?.can("update", "Organization");
  const canGetBilling = permissions?.can("get", "Billing");
  const canShutdownOrganization = permissions?.can("delete", authOrganization);

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          {canUpdateOrganization && (
            <Card className="shadow-sm">
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">
                    Organization Settings
                  </CardTitle>
                </div>
                <CardDescription>
                  Update your organization details
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <OrganizationForm
                  isUpdating
                  initialData={{
                    name: organization.name,
                    domain: organization.domain,
                    shouldAttachUsersByDomain:
                      organization.shouldAttachUsersByDomain,
                  }}
                />
              </CardContent>
            </Card>
          )}

          {canGetBilling && (
            <Card className="shadow-sm">
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">Billing</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <Billing />
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          {canUpdateOrganization && (
            <Card className="shadow-sm">
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <Image className="h-5 w-5 text-primary" />
                  <CardTitle>Organization Image</CardTitle>
                </div>
                <CardDescription className="text-sm">
                  This is the image that will appear on the home and
                  organization page
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <OrganizationImageForm
                  currentAvatarUrl={organization.avatarUrl || undefined}
                  organizationName={organization.name}
                />
              </CardContent>
            </Card>
          )}

          <Card className="shadow-sm bg-muted/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                ORGANIZATION INFORMATION
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{organization.name}</p>
              </div>
              {organization.domain && (
                <div>
                  <p className="text-sm text-muted-foreground">Domain</p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm bg-background px-2 py-1 rounded">
                      {organization.domain}
                    </code>
                    {organization.shouldAttachUsersByDomain && (
                      <Badge variant="secondary" className="text-xs">
                        Auto-link
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {canShutdownOrganization && (
        <>
          <Separator className="my-12" />

          <div className="space-y-4">
            <Card className="border-destructive/50 bg-destructive/5">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Trash2 className="h-5 w-5 text-destructive" />
                  <CardTitle className="text-destructive">
                    Delete Organization
                  </CardTitle>
                </div>
                <CardDescription>
                  This action is <strong>irreversible</strong>. All organization
                  data, including projects, users, and settings, will be
                  permanently deleted.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ShutdownOrganizationButton />
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
