export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
};

export interface UploadedFile {
    name: string;
    url: string;
    size?: number;
    param: {
      size: number;
      type: string;
    };
    customId?: string;
    serverData?: {
      createdAt: Date;
      updatedAt: Date;
      parentId?: string;
    };
  }
  