import devServer from '@hono/vite-dev-server';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    tsconfigPaths(),
    react({ jsxImportSource: '@emotion/react' }),
    devServer({
      entry: './server.mjs',
      exclude: [/^(?!\/api).*/],
    }),
  ],
});
