import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { glob } from "glob";

export default defineConfig({
    plugins: [
        react(),
        laravel({
            input: [
                'resources/css/app.css',
                ...glob.sync("resources/js/**/*.tsx", {
                    ignore: [],
                }),
            ],
            refresh: true,
        }),
    ],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'resources/js'),
        },
    },
    server: {
        watch: {
            usePolling: true,
        },
    },
    build: {
        outDir: 'public/build',
    },
});
