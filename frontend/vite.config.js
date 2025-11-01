import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    // Explicitly define the port Vite should run on
    port: 5173, 
    
    // 🛑 CRITICAL FIX: Configure HMR to point back to the expected host/port (5173)
    hmr: {
        host: 'localhost',
        port: 5173, // This tells the browser's client-side WebSocket where to connect
        protocol: 'ws' // Use standard websocket protocol
    }
  }
});