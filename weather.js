import { getArgs } from './helpers/args.js'
import {} from './services/log.service.js'
import { printHelp } from './services/log.service.js'

const initCLI = () => {
  const args = getArgs(process.argv)
  console.log(args)

  if (args.h) {
    printHelp()
  }
  if (args.s) {
    // save city
  }
  if (args.t) {
    // save token
  }
  // output weather
}

initCLI()
