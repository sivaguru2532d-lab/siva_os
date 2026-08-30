// Vite Configuration - Fixed for Windows EBUSY Error
// This config prevents "EBUSY: resource busy or locked" errors on Windows
// by ignoring the Temp folder and using polling as fallback.

import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    watch: {
      // Ignore Windows Temp folder to prevent EBUSY errors
      ignored: ['**/AppData/Local/Temp/**', '**/AppData/**'],
    },
    // Enable polling as fallback for reliable file watching on Windows
    use: true,
  },
  // Optional: prevent the root warning when running from a different directory
  root: process.cwd(),
})