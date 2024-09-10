import { Link } from '@inertiajs/react'
import {
  Files,
  Folder,
  FolderPlus,
  Image,
  Share2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useTranslation } from 'react-i18next'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function SideMenu() {
  const { t } = useTranslation();

  return (
    <div className="grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden bg-muted/40 md:block">
        <div className="flex min-h-screen mt-4 flex-col gap-2 h-screen">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Files className="h-4 w-4" />
              {t("side-menu.all-files")}
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Image className="h-4 w-4" />
              {t("side-menu.photos")}
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <Share2 className="h-4 w-4" />
              {t("side-menu.shared")}
            </Link>
            <Accordion type='multiple'>
              <AccordionItem value='2'>
                <AccordionTrigger>
                  <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary">
                    <Folder className="h-4 w-4" />
                    {t("side-menu.folders")}
                  </div>
                </AccordionTrigger>

                <AccordionContent>
                  <div className='flex flex-col gap-3 pl-10'>
                    <Link href='#' className='text-muted-foreground '>
                      Папка
                    </Link>
                    <Link href='#' className='text-muted-foreground '>
                      Папка
                    </Link>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              href={route('create-folder', { name: 'new-folder' })}
              method="post"
              as="button"
            >
              <Button variant="ghost" className="text-muted-foreground">
                <FolderPlus className="h-4 w-4 mr-2" />
                {t("side-menu.create-folder")}
              </Button>
            </Link>
          </nav>
          <div className="flex-1"></div>
          <div className="flex p-4 mb-20">
            <Card x-chunk="A card with a call to action">
              <CardHeader className="p-2 pt-0 md:p-4">
                <CardTitle>{t("side-menu.upgrade-card.title")}</CardTitle>
                <CardDescription>
                  {t("side-menu.upgrade-card.description")}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                <Button size="sm" className="w-full">
                  Upgrade
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}