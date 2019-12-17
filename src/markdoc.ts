import { process } from './core/Generator'
import { Options } from './types'

const defaultOptions: Options = {
  origin: '',
  destination: '',
  toc: false,
  ignoreH1: true,
  tocDepth: 2
}

export function markdoc(options: Options): void {
  const mergeOptions = Object.assign({}, defaultOptions, options)
  const { origin, destination } = mergeOptions

  if (!origin) throw new Error('must input the origin file')
  if (!destination) throw new Error('must input the destination')

  process(mergeOptions).then(() => {
    console.log('convert successfully')
  }).catch(e => {
    throw e
  })
}
