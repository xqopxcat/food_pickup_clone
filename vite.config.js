import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        https: true,
        host: 'local.fleet.dev.ridegoshare.com',
        port: 3030
    },
    plugins: [
        react(),
        basicSsl()
    ],
})
