import axios from "axios";
import type { AxiosProgressEvent } from "axios";
import { getErrorMessage } from "@/lib/handle-error";

interface UploadedFile {
  name: string;
  url: string;
}

interface UploadFilesResponse {
  [key: string]: string;
}

interface UploadFilesOptionsExtended {
  files: File[];
  onUploadProgress?: (progress: { file: string; progress: number }) => void;
}

export async function uploadFiles(
  endpoint: string,
  options: UploadFilesOptionsExtended
): Promise<UploadedFile[]> {
  const formData = new FormData();

  options.files.forEach((file) => {
    formData.append("file", file);
  });

  try {
    const response = await axios.post<UploadFilesResponse>(endpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent: AxiosProgressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          if (options.onUploadProgress) {
            options.onUploadProgress({
              file: options.files[0].name,
              progress,
            });
          }
        }
      },
    });
    
    const uploadedFiles: UploadedFile[] = options.files.map(file => ({
      name: file.name,
      param: response.data["param"],
      url: response.data[file.name]
    }));

    return uploadedFiles;
  } catch (error) {
    throw new Error(getErrorMessage(error));
  }
}
