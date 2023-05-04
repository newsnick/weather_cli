import { getArgs } from './helpers/args.js'
import { getWeather, getIcon } from './services/api.service.js'
import {
  printError,
  printSuccess,
  printWeather,
} from './services/log.service.js'
import { printHelp } from './services/log.service.js'
import {
  saveKeyValue,
  TOKEN_DICTIONARY,
  getKeyValue,
} from './services/storage.service.js'

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

const saveCity = async (city) => {
  if (!city.length) {
    printError('No city name')
    return
  }
  try {
    await saveKeyValue(TOKEN_DICTIONARY.city, city)
    printSuccess('Token was saved')
  } catch (e) {
    printError(e.message)
  }
}

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))
    const weather = await getWeather(city)
    printWeather(weather, getIcon(weather.weather[0].icon))
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
    return printHelp()
  }
  if (args.s) {
    return saveCity(args.s)
  }
  if (args.t) {
    return saveToken(args.t)
  }
  return getForecast()
}

initCLI()
