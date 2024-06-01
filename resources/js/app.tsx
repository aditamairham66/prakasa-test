import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/inertia-react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { Inertia } from '@inertiajs/inertia';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';  // Import the default NProgress styles

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: title => `${title} - ${appName}`,
    resolve: name => resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
});

// Configure NProgress
nprogress.configure({ showSpinner: false });

// Add Inertia event listeners to control NProgress
Inertia.on('start', () => {
    console.log('Inertia navigation started');
    nprogress.start()
});
Inertia.on('finish', (event) => {
    console.log('Inertia navigation finished');
    if (event.detail.visit.completed) {
        nprogress.done();
    } else if (event.detail.visit.interrupted) {
        nprogress.done();
    } else if (event.detail.visit.cancelled) {
        nprogress.done(true);
    }
});