import { defineConfig } from 'tsup'

export default defineConfig({
  outDir: 'bin',
  entry: {
    cli: 'src/index.ts'
  },
  banner: {
    js: '// $ klei'
  },
  format: ['esm'],
  clean: true
  // external: ['react'],
  // dts: true
})
