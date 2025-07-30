export const npmjs = [
    {
        content: '# Proyecto generado por Klei CLI.',
        pathFileName: 'README.md'
    },
    {
        content: JSON.stringify({
            name: 'my-project',
            version: '1.0.0',
            description: '',
            type: 'module',
            main: './dist/index.cjs',
            module: './dist/index.js',
            types: './dist/index.d.ts',
            files: [
                'dist/**'
            ],
            scripts: {
                start: 'tsx src/index.ts',
                xtart: 'npx -y tsx src/index.ts',
                watch: 'tsup --entry.index src/index.ts --format esm --clean --watch --onSuccess "node dist/index.js"',
                build: 'tsup --entry.index src/index.ts --format esm,cjs --dts --clean',
                'test:esm': 'tsup --entry.test src/index.ts --format esm --clean --onSuccess "node dist/test.js"',
                'test:spec': 'tsup test/test.spec.ts --format esm --clean --onSuccess "cross-env NODE_ENV=test node --test dist/test.spec.js"'
            },
            keywords: [],
            author: '',
            license: 'ISC',
            dependencies: {},
            devDependencies: {
                '@eslint/js': 'latest',
                // "@types/assert": 'latest',
                '@types/node': 'latest',
                'cross-env': 'latest',
                eslint: 'latest',
                nodemon: 'latest',
                'ts-node': 'latest',
                tsup: 'latest',
                tsx: 'latest',
                typescript: 'latest',
                'typescript-eslint': 'latest'

            }
        }, null, 2),
        pathFileName: 'package.json'
    },
    {
        content: `import { defineConfig } from 'tsup'
export default defineConfig(${JSON.stringify({
            entry: {
                index: 'src/index.ts'
            },
            format: ['esm', 'cjs'],
            dts: true,
            clean: true
        }, null, 2)})`,
        pathFileName: 'tsup.config.ts'
    },
    {
        content: JSON.stringify({
            $schema: 'https://json.schemastore.org/tsconfig',
            display: 'Default',
            compilerOptions: {
                target: 'ES2024',
                module: 'ES2022',
                // outDir: './dist',
                // rootDir: './src',
                strict: true,
                esModuleInterop: true,
                skipLibCheck: true,
                forceConsistentCasingInFileNames: true,
                declaration: true,
                moduleResolution: 'node',
                resolveJsonModule: true,
                noUnusedLocals: false,
                noImplicitThis: false,
                noUnusedParameters: false,
                baseUrl: '.',
                paths: {
                    '@/*': [
                        './src/*'
                    ]
                }
            },
            include: ['.'],
            exclude: ['node_modules', 'dist', 'build', 'docs']
        }, null, 2),
        pathFileName: 'tsconfig.json'
    },
    {
        content: `// Example TypeScript code with types and interfaces

// Define an interface for a User
interface User {
    id: number;
    name: string;
    email: string;
    isActive: boolean;
}

// Define a type for a function that takes a User and returns a string
type GreetUser = (user: User) => string;

// Example implementation of the GreetUser function
export const greetUser: GreetUser = (user) => {
    return \`Hello, \${user.name}! Your email is \${user.email}.\`;
};

// Example usage
export const exampleUser: User = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    isActive: true
};

console.log(greetUser(exampleUser));
`,
        pathFileName: 'src/index.ts'
    },
    {
        content: `// @ts-check

import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['node_modules', 'dist/', 'bin/'] },
  eslint.configs.recommended,
  tseslint.configs.strict,
  tseslint.configs.stylistic,
  {
    rules: {
        quotes: [2, 'single', { avoidEscape: true }],
        'prefer-const': ['error', { ignoreReadBeforeAssign: true }],
        'space-before-function-paren': ['off'],
        '@typescript-eslint/no-explicit-any': 'off',
        'no-useless-escape': 'off',
        'eol-last': ['error', 'always'],
        semi: ['error', 'never'],
        'quote-props': ['error', 'as-needed'],
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        'comma-dangle': ['error', 'never'],
        'no-multiple-empty-lines': ['error', { max: 1 }],
        'no-async-promise-executor': 'off',
        'no-unused-vars': 'warn',
        '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }]
    }
  }
)`,
        pathFileName: 'eslint.config.mjs'
    },
    {
        content: `# Dependencias
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Archivos de construcción
dist/
build/
*.tsbuildinfo

# Archivos de entorno
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Archivos del sistema operativo
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Archivos del editor
.vscode/
.idea/
*.swp
*.swo
*~

# Logs
logs
*.log

# Archivos temporales
*.tmp
*.temp

# Coverage directory used by tools like istanbul
coverage/
*.lcov

# NYC test coverage
.nyc_output

# Dependency directories
jspm_packages/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache

# Microbundle cache
.rpt2_cache/
.rts2_cache_cjs/
.rts2_cache_es/
.rts2_cache_umd/

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# next.js build output
.next

# nuxt.js build output
.nuxt

# vuepress build output
.vuepress/dist

# Serverless directories
.serverless

# FuseBox cache
.fusebox/

# DynamoDB Local files
.dynamodb/

# TernJS port file
.tern-port`,
        pathFileName: '.gitignore'
    },
    {
        content: `// ━━ IMPORT MODULES ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// » IMPORT NATIVE NODE MODULES

import { describe, it } from 'node:test'

import assert from 'node:assert'

// » IMPORT MODULES
import { greetUser, exampleUser } from '@/index'

// ━━ TEST ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

describe('greetUser', () => {
    it('should return a greeting message with the provided name', () => {
        const result = greetUser(exampleUser)
        assert.strictEqual(result, 'Hello, John Doe! Your email is john.doe@example.com.')
    })
})`,
        pathFileName: 'test/test.spec.ts'
    }
] as {
    content: string
    pathFileName: string
}[]
