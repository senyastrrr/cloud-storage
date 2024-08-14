import React, { useState, useEffect } from 'react';
import get_icon from '@/lib/get_icon';
import { FileProps } from '@/types/file';
import ReactPlayer from 'react-player'

interface FilePreviewContentProps {
    file: FileProps;
}

export const FilePreviewContent: React.FC<FilePreviewContentProps> = ({ file }) => {
    const [textContent, setTextContent] = useState('');

    useEffect(() => {
        if (file.param.type.startsWith('text/')) {
            fetch(file.url)
                .then(response => response.text())
                .then(text => setTextContent(text));
        }
    }, [file.url, file.param.type]);

    return (
        <>
            {file.param.type.startsWith('image/') ? (
                <img src={file.url} alt={file.name} />
            ) : file.param.type.startsWith('video/') ? (
                <ReactPlayer
                    url={file.url}
                    controls
                    width="640"
                    height="360" />
            ) : file.param.type.startsWith('text/') ? (
                <pre className="whitespace-pre-wrap">{textContent}</pre>
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
        </>
    );
};
