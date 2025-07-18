import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react({
    jsxImportSource: 'react'
  })],
    base: './',
    define: {
      global: 'globalThis',
      'process.env': {},
      __DEV__: 'false',
    },
    optimizeDeps: {
      include: ['react', 'react-dom', 'recharts'],
      exclude: [],
      force: true
    },
    resolve: {
      alias: {
        'react': 'react',
        'react-dom': 'react-dom'
      }
    },
	  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    commonjsOptions: {
      include: [/recharts/, /node_modules/]
    },
    rollupOptions: {
      external: () => {
        // Don't externalize React for recharts
        return false;
      },
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          charts: ['recharts'],
        },
        globals: {
          'react': 'React',
          'react-dom': 'ReactDOM'
        }
      },
    },
  },
});
