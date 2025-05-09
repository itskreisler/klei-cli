import chalk from 'chalk'
import figlet from 'figlet'

export const printBanner = () => {
    console.log(
        chalk.blue(
            figlet.textSync('KLEI', { horizontalLayout: 'full' })
        )
    )
}
