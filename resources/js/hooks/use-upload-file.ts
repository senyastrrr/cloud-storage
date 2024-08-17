import * as React from "react";
import type { UploadedFile } from "@/types";
import { toast } from "sonner";
import { uploadFiles } from "@/lib/upload-files";
import { getErrorMessage } from "@/lib/handle-error";
import axios from "axios";

interface UseUploadFileProps {
  defaultUploadedFiles?: UploadedFile[];
  endpoint: string;
}

export function useUploadFile({
  defaultUploadedFiles = [],
  endpoint,
  ...props
}: UseUploadFileProps) {
  const [uploadedFiles, setUploadedFiles] = React.useState<UploadedFile[]>(defaultUploadedFiles);
  const [progresses, setProgresses] = React.useState<Record<string, number>>({});
  const [isUploading, setIsUploading] = React.useState(false);

  // Fetch default uploaded files
  React.useEffect(() => {
    async function fetchDefaultUploadedFiles() {
      try {
        const response = await axios.get(endpoint);
        setUploadedFiles(response.data);
      } catch (err) {
        toast.error(getErrorMessage(err));
      }
    }

    fetchDefaultUploadedFiles();
  }, []);

  async function uploadThings(files: File[]) {
    setIsUploading(true);
    try {
      const res = await Promise.all(
        files.map(async (file) => {
          const progress = await uploadFiles(`api/file-upload`, {
            ...props,
            files: [file],
            onUploadProgress: ({ progress }) => {
              setProgresses((prev) => ({
                ...prev,
                [file.name]: progress,
              }));
            },
          });
          return {
            name: file.name,
            size: file.size,
            param: {
              size: file.size,
              type: file.type,
            },
          } as UploadedFile;
        })
      );

      setUploadedFiles((prev) => [...prev, ...res]);
    } catch (err) {
      toast.error(getErrorMessage(err));
    } finally {
      setProgresses({});
      setIsUploading(false);
    }
  }

  return {
    uploadedFiles,
    progresses,
    uploadFiles: uploadThings,
    isUploading,
  };
}