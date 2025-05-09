#!/usr/bin/env node
// $ klei

// src/index.ts
import chalk4 from "chalk";
import { program } from "commander";

// src/utils/banner.ts
import chalk from "chalk";
import figlet from "figlet";
var printBanner = () => {
  console.log(
    chalk.blue(
      figlet.textSync("KLEI", { horizontalLayout: "full" })
    )
  );
};

// src/commands/create.ts
import inquirer from "inquirer";
import chalk3 from "chalk";
import ora from "ora";

// src/utils/project.ts
import chalk2 from "chalk";
import fs2 from "fs";
import path2 from "path";

// src/templates/npmjs.ts
var npmjs = [
  {
    content: "# Proyecto generado por Klei CLI.",
    pathFileName: "README.md"
  },
  {
    content: JSON.stringify({
      name: "my-project",
      version: "1.0.0",
      description: "",
      type: "module",
      main: "./dist/index.cjs",
      module: "./dist/index.js",
      types: "./dist/index.d.ts",
      files: [
        "dist/**"
      ],
      scripts: {
        start: "tsx src/index.ts",
        xtart: "npx -y tsx src/index.ts",
        watch: 'tsup --entry.index src/index.ts --watch --onSuccess "node dist/index.js"',
        build: "tsup --entry.index src/index.ts --format esm,cjs --dts",
        "test:esm": 'tsup --entry.test src/index.ts --format esm --watch --onSuccess "node dist/test.js"',
        "test:spec": 'tsup test/test.spec.ts --format esm --onSuccess "cross-env NODE_ENV=test node --test dist/test.spec.js"'
      },
      keywords: [],
      author: "",
      license: "ISC",
      dependencies: {},
      devDependencies: {
        "@eslint/js": "latest",
        // "@types/assert": 'latest',
        "@types/node": "latest",
        // 'cross-env': 'latest',
        eslint: "latest",
        nodemon: "latest",
        "ts-node": "latest",
        tsup: "latest",
        tsx: "latest",
        typescript: "latest",
        "typescript-eslint": "latest"
      }
    }, null, 2),
    pathFileName: "package.json"
  },
  {
    content: `import { defineConfig } from 'tsup'
export default defineConfig(${JSON.stringify({
      entry: {
        index: "src/index.ts"
      },
      format: ["esm", "cjs"],
      dts: true,
      clean: true
    }, null, 2)})`,
    pathFileName: "tsup.config.ts"
  },
  {
    content: JSON.stringify({
      $schema: "https://json.schemastore.org/tsconfig",
      display: "Default",
      compilerOptions: {
        target: "ES2016",
        module: "CommonJS",
        outDir: "./dist",
        rootDir: "./src",
        strict: true,
        esModuleInterop: true,
        skipLibCheck: true,
        forceConsistentCasingInFileNames: true,
        declaration: true,
        resolveJsonModule: true,
        noUnusedLocals: false,
        noImplicitThis: false,
        noUnusedParameters: false,
        baseUrl: ".",
        paths: {
          "@/*": [
            "./src/*"
          ]
        }
      },
      include: ["src/**/*"],
      exclude: ["node_modules", "**.spec.ts", "dist", "build", "docs"]
    }, null, 2),
    pathFileName: "tsconfig.json"
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
    pathFileName: "src/index.ts"
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
    pathFileName: "eslint.config.mjs"
  }
];

// src/lib/utils/npm-utils.js
import fs from "node:fs";
import spawn from "cross-spawn";
import path from "node:path";
import process2 from "node:process";
function findPackageJson(startDir) {
  let dir = path.resolve(startDir || process2.cwd());
  do {
    const pkgFile = path.join(dir, "package.json");
    if (!fs.existsSync(pkgFile) || !fs.statSync(pkgFile).isFile()) {
      dir = path.join(dir, "..");
      continue;
    }
    return pkgFile;
  } while (dir !== path.resolve(dir, ".."));
  return null;
}
function installSyncSaveDev(packages, packageManager = "npm", cwd, installFlags = ["-D"]) {
  const packageList = Array.isArray(packages) ? packages : [packages];
  const installCmd = packageManager === "yarn" ? "add" : "install";
  const installProcess = spawn.sync(packageManager, [installCmd, ...installFlags].concat(packageList), { stdio: "inherit", cwd });
  const error = installProcess.error;
  if (error && error.code === "ENOENT") {
    const pluralS = packageList.length > 1 ? "s" : "";
    console.error(`Could not execute ${packageManager}. Please install the following package${pluralS} with a package manager of your choice: ${packageList.join(", ")}`);
  }
}
function parsePackageName(packageName) {
  const atIndex = packageName.lastIndexOf("@");
  if (atIndex > 0) {
    const name = packageName.slice(0, atIndex);
    const version2 = packageName.slice(atIndex + 1) || "latest";
    return { name, version: version2 };
  }
  return { name: packageName, version: "latest" };
}
function getPkgs(path3) {
  return JSON.parse(fs.readFileSync(path3, "utf-8"));
}

// src/utils/project.ts
var createProjectStructure = async (answers, spinner) => {
  return new Promise((resolve, reject) => {
    const projects = {
      npmjs,
      monorepo: []
    };
    const projectStr = projects[answers.projectType];
    if (!projectStr) {
      return reject(new Error("Tipo de proyecto no v\xE1lido. --t ".concat(Object.keys(projects).join(", "))));
    }
    const projectDir = path2.join(process.cwd(), answers.projectName);
    if (fs2.existsSync(projectDir) && answers.projectName !== ".") {
      return reject(new Error(`El directorio ${projectDir} ya existe. Elige otro nombre.`));
    }
    for (const file of projectStr) {
      const { content, pathFileName } = file;
      const filePath = path2.join(projectDir, pathFileName);
      if (answers.projectName === "." && fs2.existsSync(filePath)) {
        spinner.warn(`El archivo ${chalk2.yellow(filePath)} ya existe. Se omitir\xE1 su creaci\xF3n.`);
        continue;
      }
      spinner.info(`Creando ${chalk2.yellow(filePath)}`);
      const dirPath = path2.dirname(filePath);
      fs2.mkdirSync(dirPath, { recursive: true });
      fs2.writeFileSync(filePath, content);
    }
    if (answers.projectInstall) {
      spinner.info(`Instalando dependencias con ${chalk2.yellow(answers.projectPackageManager)}`);
      const packageJsonPath = findPackageJson(projectDir);
      const packageJson = getPkgs(packageJsonPath);
      const pkgs = Object.keys(packageJson.devDependencies).map((pkgName) => parsePackageName(pkgName)).map((pkg) => pkg.name);
      spinner.info(`Instalando dependencias: ${chalk2.yellow(pkgs.join(" "))}`);
      installSyncSaveDev(pkgs, answers.projectPackageManager, projectDir);
      spinner.info(chalk2.green("Dependencias instaladas exitosamente"));
    }
    spinner.succeed(`${chalk2.green(` Proyecto ${chalk2.bold(projectDir)} creado exitosamente`)}`);
    resolve(true);
  });
};

// src/commands/create.ts
var logo = `
${chalk3.dim("Creaci\xF3n r\xE1pida de proyectos")}
`;
var questionsMain = [
  {
    type: "list",
    name: "projectType",
    message: " \xBFQu\xE9 tipo de proyecto quieres crear?",
    choices: [
      { name: "npmjs package (Node.js)", value: "npmjs" }
      // { name: 'Aplicación Monorepo (Node.js)', value: 'monorepo' }
      // { name: 'Aplicación CLI (Node.js)', value: 'cli' }
    ]
  },
  {
    type: "input",
    name: "projectName",
    message: " \xBFCu\xE1l es el nombre del proyecto?",
    validate: (input) => {
      if (input.trim() === "") {
        return "El nombre del proyecto no puede estar vac\xEDo.";
      }
      return true;
    }
  },
  {
    type: "list",
    name: "projectInstall",
    message: " \xBFQuieres instalar dependencias?",
    choices: [
      { name: "S\xED", value: true },
      { name: "No", value: false }
    ]
  },
  {
    type: "list",
    name: "projectPackageManager",
    message: " \xBFQu\xE9 gestor de paquetes quieres usar?",
    choices: [
      { name: "npm", value: "npm" },
      { name: "yarn", value: "yarn" },
      { name: "pnpm", value: "pnpm" },
      { name: "bun", value: "bun" }
    ],
    when: (answers) => answers.projectInstall
  }
];
async function createCommand({ name, options }) {
  console.log(logo);
  console.log(chalk3.blue("------------------------------------------------\n"));
  const questions = [];
  if (typeof options?.type === "undefined") questions.push(questionsMain[0]);
  if (typeof name === "undefined") questions.push(questionsMain[1]);
  let answers;
  if (questions.length === 0) {
    answers = {
      projectType: options?.type,
      projectName: name,
      projectInstall: false,
      projectPackageManager: "npm" /* npm */
    };
  } else {
    questions.push(questionsMain[2]);
    questions.push(questionsMain[3]);
    answers = await inquirer.prompt(questions);
    if (typeof name !== "undefined") {
      answers.projectName = name;
    }
    if (typeof options?.type !== "undefined") {
      answers.projectType = options.type;
    }
  }
  const spinner = ora("Creando proyecto...\n\n").start();
  try {
    await createProjectStructure(answers, spinner);
  } catch (error) {
    spinner.fail(chalk3.red("Error al crear el proyecto."));
    showError(error);
  } finally {
    spinner.stop();
  }
}
var create_default = createCommand;
function showError(error) {
  if (error instanceof Error) {
    console.error(chalk3.red(error.message));
  } else {
    console.error(chalk3.red("Error desconocido".concat(JSON.stringify(error))));
  }
}

// src/index.ts
var { version } = JSON.parse(
  await import("fs").then((fs3) => fs3.readFileSync(new URL("../package.json", import.meta.url), "utf-8"))
);
printBanner();
program.name("klei").version(version, "-v, --version", "Muestra la versi\xF3n actual").description("CLI con m\xFAltiples caracter\xEDsticas");
program.command("create [name]").alias("c").option("--t, --type <type>", "Tipo de proyecto").description("Crea un nuevo proyecto").action((name, options) => {
  create_default({ name, options });
});
program.configureOutput({
  outputError: (err) => {
    console.error(chalk4.red(`Error: ${err}`));
  }
});
program.parse(process.argv);
