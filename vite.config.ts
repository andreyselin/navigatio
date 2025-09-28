import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],           // только ESM для браузера
      fileName: () => 'index.js'
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        /^react\/.*/             // jsx-runtime и пр.
      ]
    },
    sourcemap: true
  }
})
