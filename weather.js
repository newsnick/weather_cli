import { getArgs } from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import { printError, printSuccess } from './services/log.service.js'
import { printHelp } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async (token) => {
  if (!token.length) {
    printError('No provided token')
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.token, token)
    printSuccess('Token saved successfully')
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const weather = await getWeather(process.env.CITY)
    console.log(weather)
  } catch (e) {
    if (e?.response?.status == 404) {
      printError('Invalid city name')
    } else if (e?.response?.status == 401) {
      printError('Invalid token')
    } else if (e?.response?.status == 500) {
      printError('Server Error')
    } else {
      printError(e.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv)

  if (args.h) {
    printHelp()
  }
  if (args.s) {
    // save city
  }
  if (args.t) {
    return saveToken(args.t)
  }
  getForecast()
}

initCLI()
