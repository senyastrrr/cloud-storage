import type { UploadedFile } from "@/types"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { EmptyCard } from "@/components/empty-card"
import FileCard from "./file-card"
import { useTranslation, Trans } from "react-i18next"
import { useEffect, useState } from "react"
import { FileProps } from "@/types/file"

interface UploadedFilesCardProps {
  uploadedFiles: FileProps[]
}

export function UploadedFiles({ uploadedFiles }: UploadedFilesCardProps) {
  const { t } = useTranslation();
  console.log(uploadedFiles);
  const [files, setFiles] = useState(uploadedFiles);
  const handleFileDelete = (fileId: number) => {
    setFiles(files.filter((file) => file.id !== fileId));
  };

  return (

    <Card>
      <CardHeader>
        <CardTitle>{t("uploaded-files.title")}</CardTitle>
        <CardDescription>{t("uploaded-files.description")}</CardDescription>
      </CardHeader>
      <CardContent>

        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <div className="flex flex-wrap justify-center gap-4 gap-y-8">
              {uploadedFiles.map((file, index) => (
                <FileCard key={index} file={file} onDelete={handleFileDelete} />
              ))}
            </div>
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title={t("uploaded-files.empty-card.title")}
            description={t("uploaded-files.empty-card.description")}
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  )
}