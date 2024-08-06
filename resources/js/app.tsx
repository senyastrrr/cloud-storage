import './bootstrap';
import '../css/app.css';

import { Toaster } from 'sonner';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from "@/components/theme-provider"
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 3, retryDelay: 2000 } }
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <QueryClientProvider client={queryClient}>
                <I18nextProvider i18n={i18n}>
                        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
                            <App {...props} />
                        </ThemeProvider>
                </I18nextProvider>
                <Toaster />
            </QueryClientProvider >);
    },
    progress: {
        color: '#4B5563',
    },
});
