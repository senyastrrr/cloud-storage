export interface FileProps {
    id: number;
    url: string;
    name: string;
    param: {
        size: number;
        type: string;
    };
}