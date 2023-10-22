import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@config': '/src/config',
            '@dto': '/src/dto',
            '@types': '/src/types',
            '@libs': '/src/libs',
            '@routes': '/src/routes',
            '@services': '/src/services',
            '@utils': '/src/utils',
            '@assets': '/src/assets',
            '@pages': '/src/pages',
            '@components': '/src/components',
            '@hooks': '/src/hooks'
        },
    },
    preview: { port: 3001 },
});
