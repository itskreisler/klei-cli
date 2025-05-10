#!/usr/bin/env node
import chalk from 'chalk'
import { program } from 'commander'
import fs from 'fs'
// import helpCommand from '@/commands/help'
// import saludarCommand from '@/commands/saludar'
import { printBanner } from '@/utils/banner'
import createCommand from '@/commands/create'

const { version } = JSON.parse(
    fs.readFileSync(new URL('../package.json', import.meta.url), 'utf-8')
) as { version: string }

printBanner()
program
    .name('klei')
    .version(version, '-v, --version', 'Muestra la versión actual')
    .description('CLI con múltiples características')

// program.command('help').description('Muestra ayuda en español').action(helpCommand)

// saludarCommand(program)

// Comando para crear un nuevo proyecto
program
    .command('create [name]')
    .alias('c')
    .option('--t, --type <type>', 'Tipo de proyecto')
    .description('Crea un nuevo proyecto')
    .action((
        name?: string,
        options?: { type: string }
    ) => {
        createCommand({ name, options })
    })

program.configureOutput({
    outputError: (err) => {
        console.error(chalk.red(`Error: ${err}`))
    }
})

// Parsear argumentos
program.parse(process.argv)
