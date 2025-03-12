import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
})

//Open the browser when the server is running
process.env.BROWSER = "chrome";
process.env.BROWSER_ARGS = "--incognito";