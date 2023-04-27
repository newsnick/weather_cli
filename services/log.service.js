import chalk from 'chalk'
import dedent from 'dedent'

const printError = (error) => {
  console.log(chalk.bgRed('Error') + '' + error)
}

const printSuccess = (error) => {
  console.log(chalk.bgGreen('SUCCESS') + '' + error)
}

const printHelp = () => {
  console.log(
    dedent(`${chalk.bgCyan('HELP')}
        Without params - get weather
        - s [CITY] for set a city
        - h for get help
        - t [API_TOKEN] for saving token
        `)
  )
}

export { printError, printSuccess, printHelp }
