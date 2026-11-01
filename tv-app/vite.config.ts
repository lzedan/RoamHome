import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

// Oldest engine we support: Tizen 6.5 (2022 Samsung TVs) ships Chromium 85.
// Syntax is lowered to this target; CSS in src/index.css is hand-written to match.
const legacyTarget = 'chrome85'

// Vite 8, https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  // Tizen loads the app from the package filesystem, so every URL must be relative.
  base: './',
  // platform/tizen holds config.xml, the icon, and the tz project file. They are copied
  // next to index.html so `tz build` / `tz pack` can run straight against the output.
  publicDir: mode === 'tizen' ? 'platform/tizen' : false,
  plugins: [react(), classicScripts()],
  build: {
    outDir: mode === 'tizen' ? 'dist/tizen' : 'dist/web',
    target: legacyTarget,
    cssTarget: legacyTarget,
    modulePreload: false,
    rolldownOptions: {
      output: {
        format: 'iife',
      },
    },
  },
  experimental: {
    // `import.meta.url` does not exist in a classic script; resolve JS-referenced assets
    // against the document instead (index.html sits at the package root).
    renderBuiltUrl(filename, { hostType }) {
      if (hostType === 'js') return `./${filename}`
      return { relative: true }
    },
  },
  server: {
    host: '0.0.0.0',
    port: 8443,
  },
}))

/**
 * Module scripts with `crossorigin` can fail to load from a Tizen widget package, which
 * shows up as a blank screen on the TV. The bundle is a single IIFE, so load it as a
 * plain deferred script and drop `crossorigin` from the stylesheet link as well.
 */
function classicScripts(): Plugin {
  return {
    name: 'classic-scripts',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html) {
        return html
          .replace(/<script type="module" crossorigin/g, '<script defer')
          .replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet"')
      },
    },
  }
}
