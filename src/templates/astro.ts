export const astro = [
    {
        content: '# Proyecto generado por Klei CLI.',
        pathFileName: 'README.md'
    },
    {
        content: JSON.stringify({
            name: 'my-astro-project',
            type: 'module',
            version: '0.0.1',
            scripts: {
                dev: 'astro dev --host',
                build: 'astro build',
                preview: 'astro preview',
                astro: 'astro'
            },
            devDependencies: {
                '@eslint/js': 'latest',
                '@types/node': 'latest',
                '@types/react': 'latest',
                '@types/react-dom': 'latest',
                '@typescript-eslint/parser': 'latest',
                eslint: 'latest',
                'eslint-plugin-astro': 'latest',
                'typescript-eslint': 'latest'
            },
            dependencies: {
                '@astrojs/node': 'latest',
                '@astrojs/react': 'latest',
                '@astrojs/sitemap': 'latest',
                '@astrojs/vercel': 'latest',
                '@kreisler/i18n': 'latest',
                '@kreisler/vite-pwa-astro': 'latest',
                '@tailwindcss/vite': 'latest',
                astro: 'latest',
                'astro-robots-txt': 'latest',
                'astro-webmanifest': 'latest',
                react: 'latest',
                'react-dom': 'latest',
                tailwindcss: 'latest'
            }
        }, null, 2),
        pathFileName: 'package.json'
    },
    {
        content: `# Environment variables
SITE_URL=https://my-astro-project.vercel.app/
`,
        pathFileName: '.env.example'
    },
    {
        content: `// @ts-check
import { defineConfig } from 'astro/config'
import AstroPWA from '@kreisler/vite-pwa-astro'
import sitemap from '@astrojs/sitemap'
import robotsTxt from 'astro-robots-txt'
import webmanifest from 'astro-webmanifest'
import vercel from '@astrojs/vercel'
import node from '@astrojs/node'
import react from '@astrojs/react'
import tailwindcss from '@tailwindcss/vite'

const allFilesAssets = import.meta.glob('./src/assets/**/*')
const allFilesPublic = import.meta.glob('./public/**/*')

const adapter = import.meta.env.PROD
    ? vercel({ includeFiles: [...Object.keys(allFilesAssets), ...Object.keys(allFilesPublic)] })
    : node({ mode: 'standalone' })

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  vite: {
    server: {
      allowedHosts: true
    },
    plugins: [tailwindcss()]
  },
  site: 'https://my-astro-project.vercel.app/',
  adapter,
  integrations: [
    react(),
    sitemap(),
    robotsTxt(),
    webmanifest({
      name: 'My Astro Project',
      icon: 'public/favicon.svg',
      short_name: 'MyProject',
      description: 'My Astro Project Description',
      start_url: '/',
      theme_color: '#1E90FF',
      background_color: '#ffffff',
      display: 'standalone',
      config: {
        insertAppleTouchLinks: true,
        insertThemeColorMeta: false
      }
    }),
    AstroPWA({
      includeAssets: ['fonts/**/*.otf', '**/*.svg', '**/*.png', '**/*.webp'],
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,webp}']
      }
    })
  ],
  build: {
    format: 'file'
  }
})
`,
        pathFileName: 'astro.config.mjs'
    },
    {
        content: JSON.stringify({
            extends: 'astro/tsconfigs/strict',
            include: ['.astro/types.d.ts', '**/*'],
            exclude: ['dist'],
            compilerOptions: {
                baseUrl: '.',
                paths: {
                    '@src/*': ['./src/*']
                },
                jsx: 'react-jsx',
                jsxImportSource: 'react'
            }
        }, null, 2),
        pathFileName: 'tsconfig.json'
    },
    {
        content: `import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginAstro from 'eslint-plugin-astro'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { ignores: ['node_modules', 'dist/'] },
  { files: ['src/*.{js,mjs,cjs,ts,tsx,jsx}'] },
  { files: ['**/*.{js}'], languageOptions: { sourceType: 'commonjs' } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  {
    rules: {
      quotes: [2, 'single', { avoidEscape: true }],
      'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
      'space-before-function-paren': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      'no-useless-escape': 'off',
      'eol-last': 'error',
      semi: 'error',
      'quote-props': 'error',
      'spaced-comment': 'error',
      'comma-dangle': 'error',
      'no-multiple-empty-lines': 'error',
      'no-async-promise-executor': 'off',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': 'warn'
    }
  }
]
`,
        pathFileName: 'eslint.config.mjs'
    },
    {
        content: `# build output
dist/

# generated types
.astro/

# dependencies
node_modules/

# logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# environment variables
.env
.env.production

# macOS-specific files
.DS_Store

# jetbrains setting folder
.idea/
.vercel/
`,
        pathFileName: '.gitignore'
    },
    {
        content: `---
import Layout from '../layouts/Layout.astro'
---

<Layout>
	<header>Header</header>
	<main>Main Content</main>
	<footer>Footer</footer>
</Layout>
`,
        pathFileName: 'src/pages/index.astro'
    },
    {
        content: `---
import "@src/styles/global.css";

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="es">
	<head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
		<meta name="generator" content={Astro.generator} />
		<title>{title}</title>
		<meta name="description" content={description} />
		
		<!-- PWA -->
		<link rel="manifest" href="/manifest.webmanifest" />
		<meta name="application-name" content="My Project" />
		<meta name="apple-mobile-web-app-capable" content="yes" />
		<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
		<meta name="apple-mobile-web-app-title" content="My Project" />
		<link rel="apple-touch-icon" href="/favicon.svg" />
		<meta name="mobile-web-app-capable" content="yes" />
		<meta name="msapplication-starturl" content="/" />
		<meta name="msapplication-TileColor" content="#1E90FF" />
		<meta name="theme-color" content="#1E90FF" />
		
		<script is:inline>
			if ("serviceWorker" in navigator) {
				let refreshing = false;
				navigator.serviceWorker.addEventListener("controllerchange", () => {
					if (refreshing) return;
					refreshing = true;
					window.location.reload();
				});
			}
		</script>
	</head>
	<body class="grid min-h-dvh grid-rows-[auto_1fr_auto]">
		<slot />
	</body>
</html>
`,
        pathFileName: 'src/layouts/Layout.astro'
    },
    {
        content: `import path from 'path'
import fs from 'fs'

export const {
    NODE_ENV = 'development',
    CWD = process.cwd(),
    PROD,
    DEV,
    SITE = import.meta.env.SITE_URL || 'https://my-astro-project.vercel.app/'
} = import.meta.env || process.env

export const publicTemp = (...paths: string[]): string => {
    const folderWithArchive = DEV ? path.join(CWD, ...paths) : path.join('/tmp', ...paths)
    const directory = path.dirname(folderWithArchive)
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true })
    }
    return folderWithArchive
}

export const publicSrc = (...paths: string[]) => path.join(CWD, ...paths)
`,
        pathFileName: 'src/env.ts'
    },
    {
        content: `import path from 'path'
import fs from 'fs'

export const {
    NODE_ENV = 'development',
    CWD = process.cwd(),
    PROD,
    DEV,
    SITE = import.meta.env.SITE_URL || 'https://my-astro-project.vercel.app/'
} = import.meta.env || process.env

export const publicTemp = (...paths: string[]): string => {
    const folderWithArchive = DEV ? path.join(CWD, ...paths) : path.join('/tmp', ...paths)
    const directory = path.dirname(folderWithArchive)
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true })
    }
    return folderWithArchive
}

export const publicSrc = (...paths: string[]) => path.join(CWD, ...paths)
`,
        pathFileName: 'src/libs/env.ts'
    },
    {
        content: `import { createI18n } from '@kreisler/i18n'
import { es } from '@src/i18n/langs/es'
import { en } from '@src/i18n/langs/en'
import { z } from 'astro/zod'

export const translations = {
    es,
    en
}

export const i18n = createI18n({
    defaultLocale: 'es',
    messages: {
        es,
        en
    }
})

export const { getAvailableLocales, getDefaultLocale, useTranslations } = i18n

export const defaultLang = getDefaultLocale()

export const languagesKeys = getAvailableLocales()

export const SchemaLang = z.enum(languagesKeys, { message: 'Invalid lang' })

export const SchemaParamsLang = z.object({ lang: SchemaLang }, { message: 'Invalid param lang' })

export type UILanguageKeys = z.infer<typeof SchemaLang>

export type Lang = z.infer<typeof SchemaParamsLang>

export type Languages = z.infer<typeof SchemaLang>

export function getStaticPathsLang(): { params: { lang: UILanguageKeys } }[] {
    return languagesKeys.map(lang => ({ params: { lang } }))
}

export const getLangFromUrl = (astroUrl: URL): UILanguageKeys => {
    const url = new URL(astroUrl.toString().toLowerCase())
    const [, lang] = url.pathname.split('/')
    return lang in translations ? lang as UILanguageKeys : getDefaultLocale()
}

export const t18n = (astroUrl: URL) => {
    const url = new URL(astroUrl.toString().toLowerCase())
    const lang = getLangFromUrl(url)
    return useTranslations(lang)
}
`,
        pathFileName: 'src/i18n/translate.ts'
    },
    {
        content: `export const es = {
    page: {
        home: {
            helloworld: 'Hola Mundo',
            select: {
                label: 'Selecciona un formato',
                placeholder: 'Elige una opción',
                movie: 'Película',
                series: 'Serie'
            }
        }
    }
} as const

export type SchemaEs = typeof es
`,
        pathFileName: 'src/i18n/langs/es.ts'
    },
    {
        content: `export const en = {
    page: {
        home: {
            helloworld: 'Hello World',
            select: {
                label: 'Select a format',
                placeholder: 'Choose an option',
                movie: 'Movie',
                series: 'Series'
            }
        }
    }
} as const

export type SchemaEn = typeof en
`,
        pathFileName: 'src/i18n/langs/en.ts'
    },
    {
        content: `/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
`,
        pathFileName: 'src/env.d.ts'
    },
    {
        content: `/// <reference types="astro/client" />

interface WindowEventMap {
    'sw:updated': CustomEvent<ServiceWorkerRegistration>
}

declare global {
    interface Navigator {
        serviceWorker: Navigator['serviceWorker']
    }
}

import 'react'

declare module 'react' {
    interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
        tw?: string
    }
}
`,
        pathFileName: 'src/global.d.ts'
    },
    {
        content: `@import "tailwindcss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: system-ui, sans-serif;
}

body {
  min-height: 100vh;
}
`,
        pathFileName: 'src/styles/global.css'
    },
    {
        content: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="50" fill="#1E90FF"/>
  <text x="50" y="55" font-size="40" text-anchor="middle" fill="white" font-family="system-ui">A</text>
</svg>
`,
        pathFileName: 'public/favicon.svg'
    }
] as {
    content: string
    pathFileName: string
}[]
