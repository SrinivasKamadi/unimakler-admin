import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vitejs.dev/config/
export default defineConfig({
  base: "https://admin.unimakler.com/",
  plugins: [
    react({
      fastRefresh: false
    })
  ]
});
