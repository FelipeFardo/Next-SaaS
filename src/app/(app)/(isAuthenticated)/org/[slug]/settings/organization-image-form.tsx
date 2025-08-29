"use client";

import { useQueryClient } from "@tanstack/react-query";
import { Check, Upload, User, X } from "lucide-react";
import { useParams } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { GetOrganizationResponse } from "@/http/orgs/get-organization";
import { createUpload } from "@/http/uploads/create-upload";
import { upload } from "@/http/uploads/upload";
import { updateImageOrganizationAction } from "./actions";

interface OrganizationImageFormProps {
  currentAvatarUrl?: string;
  organizationName: string;
}

export function OrganizationImageForm({
  currentAvatarUrl,
  organizationName,
}: OrganizationImageFormProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { slug: orgSlug } = useParams<{
    slug: string;
    project: string;
  }>();

  const queryClient = useQueryClient();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    // Validar tipo de arquivo
    if (!file.type.startsWith("image/")) {
      toast("Erro", {
        description: "Please select image files only.",
      });
      return;
    }

    // Validar tamanho do arquivo (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast("Erro", {
        description: "File must be at most 5MB.",
      });
      return;
    }

    setSelectedFile(file);

    // Criar URL de preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  function onUpdateOrganizationImageCache(newAvatarUrl: string) {
    queryClient.setQueryData<GetOrganizationResponse>(
      ["organization", orgSlug],
      (oldOrganization) => {
        if (!oldOrganization) return;
        return {
          organization: {
            ...oldOrganization.organization,
            avatarUrl: newAvatarUrl,
          },
        };
      },
    );
  }

  async function onSave(file: File) {
    const { signedUrl, fileUrl } = await createUpload({
      contentType: file.type,
      name: file.name,
    });

    await upload({
      url: signedUrl,
      file,
    });

    await updateImageOrganizationAction(fileUrl);
    onUpdateOrganizationImageCache(fileUrl);
  }

  const handleSave = async () => {
    if (!selectedFile) return;

    setIsLoading(true);

    try {
      await onSave(selectedFile);

      // Limpar preview e arquivo selecionado
      setPreviewUrl(null);
      setSelectedFile(null);

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast("Sucesso", {
        description: "Organization avatar updated successfully.",
      });
    } catch (error) {
      toast("Erro", {
        description: "Failed to save avatar. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setPreviewUrl(null);
    setSelectedFile(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const displayUrl = previewUrl || currentAvatarUrl;
  const hasChanges = Boolean(previewUrl && selectedFile);

  return (
    <div className="space-y-4">
      {/* Avatar Display */}
      <div className="flex flex-col items-center space-y-4">
        <Avatar className="h-40 w-40 border-2 border-muted">
          <AvatarImage
            src={displayUrl}
            alt={`Avatar de ${organizationName}`}
            className="object-cover"
          />
          <AvatarFallback className="text-lg font-semibold bg-muted">
            <User className="h-8 w-8" />
          </AvatarFallback>
        </Avatar>

        {/* Upload Button */}
        {!hasChanges && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleUploadClick}
            className="gap-2"
          >
            <Upload className="h-4 w-4" />
            {currentAvatarUrl ? "Change Image" : "Add Image"}
          </Button>
        )}

        {/* Action Buttons */}
        {hasChanges && (
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isLoading}
              className="gap-2"
            >
              <Check className="h-4 w-4" />
              {isLoading ? "Saving..." : "Save"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={isLoading}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              Cancel
            </Button>
          </div>
        )}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Help Text */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Accepted formats: JPG, PNG. Maximum size: 5MB
        </p>
      </div>
    </div>
  );
}
