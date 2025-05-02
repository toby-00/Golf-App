import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/golf-strokes-gained/',  // If deploying to GitHub Pages, adjust accordingly
  plugins: [react()]
});
