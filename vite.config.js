import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import fs from 'fs';
import path from "path";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import process from 'process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {

    server: {
      host: 'mm.local',
      port: '5173',
      https: {
        key: fs.readFileSync(path.resolve(__dirname, env.VITE_API_KEY)),
        cert: fs.readFileSync(path.resolve(__dirname, env.VITE_API_URL))
      }
    },
    plugins: [react()],
  };
});