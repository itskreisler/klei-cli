import { Command } from 'commander'
import chalk from 'chalk'

export default (program: Command) => {
    program
        .command('saludar <nombre>')
        .description('Saluda al usuario')
        .option('-e, --exclamar', 'Agrega una exclamación')
        .action((nombre: string, options: { exclamar?: boolean }) => {
            let mensaje = `Hola ${chalk.green(nombre)}!`
            if (options.exclamar) mensaje += ' 👋'
            console.log(mensaje)
        })
}
