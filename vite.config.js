import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    base: 'https://chvg1968.github.io/goit-react-hw-04-phonebook/'
})