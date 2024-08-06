export interface FileProps {
    file: {
        id: number;
        url: string;
        name: string;
        param: {
            size: number;
            type: string;
        };
    };
}