import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';

const Sidebar = () => {
    const [activeAccordion, setActiveAccordion] = useState<string | undefined>(undefined);

    const handleAccordionChange = (value: string | undefined) => {
        setActiveAccordion(value);
    };

    return (
        <div className="flex h-screen flex-col bg-gray-900 text-white">
            <div className="flex items-center justify-between px-4 py-2">
                <div className="text-lg font-bold">Dropbox</div>
                <Button variant="ghost">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                        />
                    </svg>
                </Button>
            </div>
            <Separator className="my-2" />
            <Accordion
                type="single"
                collapsible
                value={activeAccordion}
                onValueChange={handleAccordionChange}
            >
                <AccordionItem value="files">
                    <AccordionTrigger>Все файлы</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 px-4 py-2">
                            <div>Фото</div>
                            <div>Общий доступ</div>
                            <div>Подписки</div>
                            <div>Удаленные файлы</div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="folders">
                    <AccordionTrigger>Папки</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 px-4 py-2">
                            <div>New folder</div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
            <div className="flex-grow"></div>
            <div className="px-4 py-2">
                <div className="text-sm text-gray-400">Начало работы</div>
                <div className="mt-2 flex items-center justify-between">
                    <div>60%</div>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
