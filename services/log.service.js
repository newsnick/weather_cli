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

const printWeather = (res, icon) => {
  console.log(dedent`${chalk.bgYellow('WEATHER')} Weather in city ${res.name}
  ${icon} ${res.weather[0].descripton}
  Temperature: ${res.main.temp} (feel like ${res.main.feel_like}) 
  Humidity: ${res.main.humidity}%
  Wind speed: ${res.wind_speed}`)
}

export { printError, printSuccess, printHelp, printWeather }
