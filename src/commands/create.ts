import inquirer from 'inquirer'
import chalk from 'chalk'
import ora from 'ora'
import { createProjectStructure } from '@/utils/project'
import { TypeInstall, type TypeProject, type Answers } from '@/types/dts'
//
const logo = `
${chalk.dim('Creación rápida de proyectos')}
`
const questionsMain = [
    {
        type: 'list',
        name: 'projectType',
        message: ' ¿Qué tipo de proyecto quieres crear?',
        choices: [
            { name: 'npmjs package (Node.js)', value: 'npmjs' }
            // { name: 'Aplicación Monorepo (Node.js)', value: 'monorepo' }
            // { name: 'Aplicación CLI (Node.js)', value: 'cli' }
        ]
    },
    {
        type: 'input',
        name: 'projectName',
        message: ' ¿Cuál es el nombre del proyecto?',
        validate: (input: string) => {
            if (input.trim() === '') {
                return 'El nombre del proyecto no puede estar vacío.'
            }
            return true
        }
    },
    {
        type: 'list',
        name: 'projectInstall',
        message: ' ¿Quieres instalar dependencias?',
        choices: [
            { name: 'No', value: false },
            { name: 'Sí', value: true }
        ]
    },
    {
        type: 'list',
        name: 'projectPackageManager',
        message: ' ¿Qué gestor de paquetes quieres usar?',
        choices: [
            { name: 'npm', value: 'npm' },
            { name: 'yarn', value: 'yarn' },
            { name: 'pnpm', value: 'pnpm' },
            { name: 'bun', value: 'bun' }
        ],
        when: (answers: {
            projectInstall: boolean
        }) => answers.projectInstall
    }
]
async function createCommand({ name, options }: {
    name?: string,
    options?: { type: string }
}) {
    console.log(logo)
    console.log(chalk.blue('------------------------------------------------\n'))
    const questions = []
    if (typeof options?.type === 'undefined') questions.push(questionsMain[0])
    if (typeof name === 'undefined') questions.push(questionsMain[1])
    let answers
    if (questions.length === 0) {
        answers = {
            projectType: options?.type as TypeProject,
            projectName: name as string,
            projectInstall: false,
            projectPackageManager: TypeInstall.npm
        }
    } else {
        questions.push(questionsMain[2])
        questions.push(questionsMain[3])
        answers = await inquirer.prompt(questions as any) as Answers
        if (typeof name !== 'undefined') {
            answers.projectName = name
        }
        if (typeof options?.type !== 'undefined') {
            answers.projectType = options.type as TypeProject
        }
    }

    const spinner = ora('Creando proyecto...\n\n').start()
    try {
        await createProjectStructure(answers, spinner)
    } catch (error) {
        spinner.fail(chalk.red('Error al crear el proyecto.'))
        showError(error)
    } finally {
        spinner.stop()
    }
}

export default createCommand
function showError(error: unknown) {
    if (error instanceof Error) {
        console.error(chalk.red(error.message))
    } else {
        console.error(chalk.red('Error desconocido'.concat(JSON.stringify(error))))
    }
}
