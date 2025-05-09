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
                watch: 'tsup --entry.index src/index.ts --watch --onSuccess "node dist/index.js"',
                build: 'tsup --entry.index src/index.ts --format esm,cjs --dts',
                'test:esm': 'tsup --entry.test src/index.ts --format esm --watch --onSuccess "node dist/test.js"',
                'test:spec': 'tsup test/test.spec.ts --format esm --onSuccess "cross-env NODE_ENV=test node --test dist/test.spec.js"'
            },
            keywords: [],
            author: '',
            license: 'ISC',
            dependencies: {},
            devDependencies: {
                '@eslint/js': 'latest',
                // "@types/assert": 'latest',
                '@types/node': 'latest',
                // 'cross-env': 'latest',
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
                target: 'ES2016',
                module: 'CommonJS',
                outDir: './dist',
                rootDir: './src',
                strict: true,
                esModuleInterop: true,
                skipLibCheck: true,
                forceConsistentCasingInFileNames: true,
                declaration: true,
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
            include: ['src/**/*'],
            exclude: ['node_modules', '**.spec.ts', 'dist', 'build', 'docs']
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
const greetUser: GreetUser = (user) => {
    return \`Hello, \${user.name}! Your email is \${user.email}.\`;
};

// Example usage
const exampleUser: User = {
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
        'no-async-promise-executor': 'off'
    }
  }
)`,
        pathFileName: 'eslint.config.mjs'
    }
] as {
    content: string
    pathFileName: string
}[]
