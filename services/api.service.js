import https from 'https'
import { TOKEN_DICTIONARY, getKeyValue } from './storage.service.js'
import axios from 'axios'

const getWeather = async (city) => {
  //  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&Lang=en&units=metric`
  const token = process.env.TOKEN ?? (await getKeyValue(TOKEN_DICTIONARY.token))
  if (!token) {
    throw new Error(
      'No API token set, pls save api token with -t [API_KEY] command'
    )
  }

  const { data } = await axios.get(
    'https://api.openweathermap.org/data/2.5/weather',
    {
      params: {
        q: city,
        appid: token,
        lang: 'en',
        units: 'metric',
      },
    }
  )
  console.log(data)
  return data
}

//   const url = new URL('https://api.openweathermap.org/data/2.5/weather')

//   url.searchParams.append('q', city)
//   url.searchParams.append('appid', token)
//   url.searchParams.append('language', 'en')
//   url.searchParams.append('units', 'metric')

//   https.get(url, (response) => {
//     let res = ''

//     response.on('data', (chunk) => {
//       res += chunk
//     })
//     response.on('end', () => {
//       console.log(res)
//     })
//   })
// }

export { getWeather }
