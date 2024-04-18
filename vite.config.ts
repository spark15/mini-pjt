import { defineConfig } from 'vite';
import ViteFaviconPlugin from 'vite-plugin-favicon';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
})
