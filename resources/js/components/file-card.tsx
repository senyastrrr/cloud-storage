// FileCard.tsx
import React, { useState } from 'react';
import get_icon from '@/lib/get_icon';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { FileProps } from '@/types/file';
import FilePreview from './file-preview';
import { EllipsisVertical } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import axios from 'axios';

const FileCard: React.FC<FileProps> = ({ file }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleDelete = async () => {
        try {
            await axios.delete(`/api/items/${file.id}`);
            alert('File deleted successfully.');
        } catch (error) {
            console.error('Error deleting the file:', error);
            alert('Failed to delete the file.');
        }
    };

    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    <FilePreview file={file} trigger={
                        <div
                            className='relative max-w-48 bg-black'
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                        >
                            <div
                                key={file.url}
                                className="h-48 grid content-center"
                            >
                                {file.param.type.startsWith('image/') ? (
                                    <img src={file.url} alt={file.name} className='max-w-48 max-h-48' />
                                ) : file.param.type.startsWith('video/') ? (
                                    <video>
                                        <source src={file.url} type={file.param.type} />
                                    </video>
                                ) : (
                                    <div
                                        className="w-48 h-48 pointer-events-none"
                                        dangerouslySetInnerHTML={{
                                            __html: get_icon({
                                                extensions: { current: file.param.type.split('/')[1] },
                                                subType: file.param.type.split('/')[1],
                                                type: file.param.type.split('/')[0],
                                            }),
                                        }}
                                    />
                                )}
                            </div>
                            <span className="line-clamp-1 text-center">{file.name}</span>
                            <div className="absolute top-0 right-4 flex space-x-2">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        {isHovered &&
                                            <button className="outline-none">
                                                <EllipsisVertical />
                                            </button>}
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={handleDelete}>
                                            Delete
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            rename
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            haha
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>

                            </div>
                        </div>} />
                </TooltipTrigger>
                <TooltipContent>
                    <p>{file.name}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider >
    );
};

export default FileCard;
