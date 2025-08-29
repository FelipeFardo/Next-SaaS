import { ProjectForm } from "@/app/(app)/(isAuthenticated)/org/[slug]/create-project/project-form";
import { InterceptedSheetContent } from "@/components/intercepted-sheet-content";
import { Sheet, SheetHeader, SheetTitle } from "@/components/ui/sheet";

export default function CreateProject() {
  return (
    <Sheet defaultOpen>
      <InterceptedSheetContent>
        <SheetHeader>
          <SheetTitle>Create project</SheetTitle>
        </SheetHeader>

        <div className="p-4">
          <ProjectForm />
        </div>
      </InterceptedSheetContent>
    </Sheet>
  );
}
