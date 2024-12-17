import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react']
  },
  resolve: {
    dedupe: ['react', 'react-dom']
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'lucide-react': ['lucide-react']
        }
      }
    }
  },
  server: {
    hmr: {
      overlay: true
    },
    watch: {
      usePolling: true
    }
  }
});