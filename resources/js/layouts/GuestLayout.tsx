import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo from '@/components/common/ApplicationLogo';
import Dropdown from '@/components/common/Dropdown';
import NavLink from '@/components/common/NavLink';
import ResponsiveNavLink from '@/components/common/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { ModeToggle } from '@/components/mode-toggle';
import LanguageSwitcher from '@/components/language-switcher';

export default function Guest({ header, children }: PropsWithChildren<{ header?: ReactNode }>) {

    return (
        <div className="min-h-screen">
            <nav className='border-b-2 border-inherit'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="shrink-0 flex items-center">
                            <Link href="/">
                                <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                            </Link>
                        </div>


                        <div className="hidden sm:flex sm:items-center sm:ms-6 gap-4">
                            <ModeToggle />
                            <LanguageSwitcher />
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
