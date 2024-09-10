import { Link, Head, usePage } from '@inertiajs/react'
import { PageProps } from '@/types'
import { FileUploader } from "@/components/file-uploader"
import { UploadedFiles } from "@/components/uploaded-files"
import { useUploadFile } from "@/hooks/use-upload-file"
import Authenticated from '@/layouts/AuthenticatedLayout';
import { useTranslation } from 'react-i18next'
import SideMenu from '@/components/side-menu'
import Home from '@/layouts/HomeLayout'
import { Button } from '@/components/ui/button'

export default function Dashboard({ auth, laravelVersion, phpVersion }: PageProps<{ laravelVersion: string, phpVersion: string }>) {
    const {
        uploadedFiles,
        progresses,
        uploadFiles,
        isUploading,
    } = useUploadFile({ endpoint: `/api/items-by-user`, userId: auth.user.id });
    const { t } = useTranslation();
    return (
        <Home user={auth.user}>
            <Head title="Welcome" />
            <div className='flex flex-row'>
                <SideMenu />
                <div className="min-h-screen w-screen flex flex-col items-center">
                    <div className="relative w-full px-10">
                        <main className="mt-8">
                            <div className="space-y-10">
                                <FileUploader
                                    onUpload={uploadFiles}
                                    progresses={progresses}
                                />
                                <UploadedFiles uploadedFiles={uploadedFiles} />
                            </div>
                        </main>

                        <footer className="py-16 text-center text-sm">
                            
                        </footer>
                    </div>
                </div>
            </div>
        </Home>
    );
}
