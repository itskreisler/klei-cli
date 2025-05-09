import chalk from 'chalk'

function helpCommand() {
  console.log(chalk.blue('-'.repeat(48)))
  console.log(chalk.bold.green('klei CLI - Ayuda'))
  console.log(chalk.yellow(`
  Comandos disponibles:

    help              Muestra la ayuda y los comandos disponibles.
    create            Crea un nuevo proyecto.

  Uso:
    klei <comando>

  Ejemplos:
    klei create         - Crea un nuevo proyecto.
    klei help           - Muestra la ayuda.
  `))
  console.log(chalk.blue('-'.repeat(48)))
}

export default helpCommand
