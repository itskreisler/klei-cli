import chalk from 'chalk'
import { type SimpleGit } from 'simple-git'
import { Ora } from 'ora'
import fs from 'fs'
import { Answers } from '@/types/dts'
import path from 'path'
import { npmjs } from '@/templates/npmjs'
import { findPackageJson, getPkgs, installSyncSaveDev, parsePackageName } from '@/lib/utils/npm-utils'

export const createProjectStructureGit = async (git: SimpleGit, projectDir: string, projectType: 'api' | 'cli' | 'monolith', spinner: Ora) => {
    const projectUrls = {
        api: 'https://github.com/martinezpke/API-FILE-STRUCTURE.git',
        monolith: 'https://github.com/martinezpke/APP-MONOLITICA-FILE-STRUCTURE.git',
        cli: 'https://github.com/martinezpke/CLI-APP-FILE-STRUCTURE.git'
    }

    const repoUrl = projectUrls[projectType]

    if (!repoUrl) {
        spinner.fail(chalk.red(' Tipo de proyecto no válido.'))
        return
    }

    try {
        await git.clone(repoUrl, projectDir)
        console.log(chalk.green('Proyecto creado exitosamente en: ' + projectDir))
    } catch (error) {
        spinner.fail(chalk.red('Error al clonar el proyecto.'))
        console.error(chalk.red(
            JSON.stringify(error, null, 2)
        )) // Mensaje de error
    }
}
export const createProjectStructure = async (answers: Answers, spinner: Ora) => {
    return new Promise((resolve, reject) => {
        const projects = {
            npmjs,
            monorepo: []
        }
        const projectStr = projects[answers.projectType]
        if (!projectStr) {
            return reject(new Error('Tipo de proyecto no válido. --t '.concat(Object.keys(projects).join(', '))))
        }
        const projectDir = path.join(process.cwd(), answers.projectName)
        if (fs.existsSync(projectDir) && answers.projectName !== '.') {
            return reject(new Error(`El directorio ${projectDir} ya existe. Elige otro nombre.`))
        }

        for (const file of projectStr) {
            const { content, pathFileName } = file
            const filePath = path.join(projectDir, pathFileName)
            // Si se usa . y el directorio actual ya tiene los archivos, se lanza un advertencia
            if (answers.projectName === '.' && fs.existsSync(filePath)) {
                spinner.warn(`El archivo ${chalk.yellow(filePath)} ya existe. Se omitirá su creación.`)
                continue
            }

            // Crear directorios de forma recursiva
            spinner.info(`Creando ${chalk.yellow(filePath)}`)
            const dirPath = path.dirname(filePath)
            fs.mkdirSync(dirPath, { recursive: true })

            // Crear el archivo
            fs.writeFileSync(filePath, content)
        }
        if (answers.projectInstall) {
            spinner.info(`Instalando dependencias con ${chalk.yellow(answers.projectPackageManager)}`)
            const packageJsonPath = findPackageJson(projectDir)
            const packageJson = getPkgs(packageJsonPath) as { devDependencies: Record<string, string> }
            const pkgs = Object.keys(packageJson.devDependencies)
                .map((pkgName) => parsePackageName(pkgName))
                .map((pkg) => pkg.name)

            spinner.info(`Instalando dependencias: ${chalk.yellow(pkgs.join(' '))}`)
            installSyncSaveDev(pkgs, answers.projectPackageManager, projectDir)
            spinner.info(chalk.green('Dependencias instaladas exitosamente'))
        }

        spinner.succeed(`${chalk.green(` Proyecto ${chalk.bold(projectDir)} creado exitosamente`)}`)
        resolve(true)
    })
}
