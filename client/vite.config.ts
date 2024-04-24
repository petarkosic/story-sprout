import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
	server: {
		watch: {
			usePolling: true,
		},
		strictPort: true,
		port: 3000, // you can replace this port with any port
	},
	plugins: [react()],
});
