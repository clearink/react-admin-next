import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  extract: {
    include: ['**/*.{tsx,jsx,js,css,scss,html}'],
    exclude: ['node_modules', '.git', 'build'],
  },
  preflight: false
})