import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the same build works under any GitHub Pages path —
// a user/org site at "/", or a project site at "/<repo>/" — with no config.
export default defineConfig({
  base: './',
  plugins: [react()],
  define: {
    // mathjax-full's version.js runs `eval('require')` unless PACKAGE_VERSION
    // is defined; that eval throws in the browser. Defining it makes the module
    // take the literal branch, so the eval IIFE is never invoked.
    PACKAGE_VERSION: JSON.stringify('3.2.1'),
  },
})
