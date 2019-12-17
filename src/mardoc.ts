import { process } from './core/Generator'
import { Options } from './types'
import { isFile, isDirectory } from 'path-type'

const defaultOptions: Options = {
  origin: '',
  destination: '',
  toc: false,
  ignoreH1: true,
  tocDepth: 2
}

export function mardoc(options: Options): void {
  const mergeOptions = Object.assign({}, defaultOptions, options)
  const { origin, destination, toc, ignoreH1, tocDepth } = mergeOptions

  if (!origin) throw new Error('The origin parameter is required')
  if (!((async () => {
    await isFile(origin)
  })() && /md$/.test(origin))) {
    throw new Error('The origin must be a markdown file')
  }
  if (!destination) throw new Error('The destination parameter is required')
  if (!(async () => {
    await isDirectory(destination)
  })()) {
    throw new Error('The destination must be a directory path')
  }
  if (tocDepth! > 6) throw new Error('The depth of the toc should not larger than 6')
  if (typeof toc !== 'boolean') throw new Error('The parameter type of the parameter toc is boolean')
  if (typeof ignoreH1 !== 'boolean') throw new Error('The parameter type of the parameter ignoreH1 is boolean')

  process(mergeOptions).then(() => {
    console.log('convert successfully')
  }).catch(e => {
    throw e
  })
}
