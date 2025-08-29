import { useCallback, useState } from "react";
import { createUpload } from "@/http/uploads/create-upload";
import { upload } from "@/http/uploads/upload";
import { Input } from "./ui/input";

export interface InputFileProps {
  onUpload: (fileUrl: string) => void;
  onRemove?: () => void;
  onError?: (error: Error) => void;
  onUploadStart?: () => void;
  onUploadProgress?: (progress: number) => void;
  id: string;
  accept?: string;
  maxSize?: number; // em bytes
  disabled?: boolean;
  multiple?: boolean;
}

export function InputFile({
  onUpload,
  onRemove,
  onError,
  onUploadStart,
  // onUploadProgress,
  accept,
  maxSize = 10 * 1024 * 1024, // 10MB default
  disabled = false,
  multiple = false,
  ...props
}: InputFileProps) {
  const [isUploading, setIsUploading] = useState(false);

  const validateFile = useCallback(
    (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `Arquivo muito grande. Tamanho máximo: ${(maxSize / 1024 / 1024).toFixed(1)}MB`;
      }

      if (accept) {
        const acceptedTypes = accept.split(",").map((type) => type.trim());
        const isValidType = acceptedTypes.some((type) => {
          if (type.startsWith(".")) {
            return file.name.toLowerCase().endsWith(type.toLowerCase());
          }
          return file.type.match(type.replace("*", ".*"));
        });

        if (!isValidType) {
          return `Tipo de arquivo não permitido. Tipos aceitos: ${accept}`;
        }
      }

      return null;
    },
    [accept, maxSize],
  );

  const uploadFile = useCallback(
    async (file: File) => {
      try {
        setIsUploading(true);
        onUploadStart?.();

        console.log(file);
        const { signedUrl, fileUrl } = await createUpload({
          name: file.name,
          contentType: file.type,
        });

        await upload({
          url: signedUrl,
          file,
          // onProgress: onUploadProgress
        });

        onUpload(fileUrl);
      } catch (error) {
        console.error("Erro no upload:", error);
        onError?.(
          error instanceof Error
            ? error
            : new Error("Erro desconhecido no upload"),
        );
      } finally {
        setIsUploading(false);
      }
    },
    [
      onUpload,
      onUploadStart,
      // onUploadProgress,
      onError,
    ],
  );

  const handleInputChange = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) {
        onRemove?.();
        return;
      }

      if (multiple) {
        // Processar múltiplos arquivos
        const fileArray = Array.from(files);
        for (const file of fileArray) {
          const validationError = validateFile(file);
          if (validationError) {
            onError?.(new Error(validationError));
            continue;
          }
          await uploadFile(file);
        }
      } else {
        // Processar arquivo único
        const file = files[0];
        const validationError = validateFile(file);

        if (validationError) {
          onError?.(new Error(validationError));
          return;
        }

        await uploadFile(file);
      }
    },
    [multiple, validateFile, uploadFile, onRemove, onError],
  );

  return (
    <Input
      type="file"
      accept={accept}
      multiple={multiple}
      disabled={disabled || isUploading}
      onChange={(e) => handleInputChange(e.target.files)}
      {...props}
    />
  );
}
