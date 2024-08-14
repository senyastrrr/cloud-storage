import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FileProps } from "@/types/file";
import { formatBytes } from "@/lib/utils";
import { FilePreviewContent } from "./file-preview-content";
import "../../css/sheet-content.css";
import React from "react";

interface FilePreviewProps {
    trigger: React.ReactNode;
    file: FileProps;
}

const FilePreview = React.forwardRef<HTMLDivElement, FilePreviewProps>(({ file, trigger }, ref) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                {trigger}
            </SheetTrigger>
            <SheetContent side="right" className="sheet-content">
                <SheetHeader>
                    <SheetTitle>{file.name}</SheetTitle>
                    <SheetDescription>
                        {file.param.type} * {formatBytes(file.param.size)} | File info
                    </SheetDescription>
                </SheetHeader>
                <FilePreviewContent file={file} />
                <SheetFooter className="mt-6">
                    <SheetClose asChild>
                        <Button type="submit">Перейти к оформлению</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
});

export default FilePreview;
