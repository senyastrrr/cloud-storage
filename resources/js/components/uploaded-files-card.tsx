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
import get_icon from "@/lib/get_icon"

interface UploadedFilesCardProps {
  uploadedFiles: UploadedFile[]
}

export function UploadedFilesCard({ uploadedFiles }: UploadedFilesCardProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle>Uploaded files</CardTitle>
        <CardDescription>View the uploaded files here</CardDescription>
      </CardHeader>
      <CardContent>
        {uploadedFiles.length > 0 ? (
          <ScrollArea className="pb-4">
            <div className="flex w-max space-x-4">
              {uploadedFiles.map((file) => (
                <div key={file.url}>
                  <div
                    className="relative aspect-video w-48"
                    dangerouslySetInnerHTML={{
                      __html: get_icon({
                        extensions: { current: file.param.type.split('/')[1] },
                        subType: file.param.type.split('/')[1],
                        type: file.param.type.split('/')[0],
                      }),
                    }}
                  />
                  {file.name}
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <EmptyCard
            title="No files uploaded"
            description="Upload some files to see them here"
            className="w-full"
          />
        )}
      </CardContent>
    </Card>
  )
}
