import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync('./ssl/selfsigned.key'),
      cert: fs.readFileSync('./ssl/selfsigned.crt'),
    },
  },
  plugins: [react()],
});
