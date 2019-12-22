import fs from 'fs-extra'
import path from 'path'
import Renderer from './Renderer'
import { Options } from '../types'

export async function generate(options: Options): Promise<void> {
  const { origin, destination, theme, toc, tocDepth, ignoreH1, codeBlockStyle } = options
  let renderer: any

  try {
    // Instantiation
    renderer = new Renderer(toc!, ignoreH1!, tocDepth!, theme!, codeBlockStyle!)
  } catch (e) {
    throw e
  }

  let stat
  try {
    stat = fs.lstatSync(origin)
  } catch (e) {
    throw e
  }

  if (stat.isFile()) {
    if (!/\.md$/.test(origin)) {
      throw new Error(`${path.join(process.cwd(), origin)} is not a md format file.`)
    }

    try {
      const mdRaw = fs.readFileSync(origin, { encoding: 'utf8' })
      const result = renderer.convert(mdRaw)
      if (/\.html$/.test(destination)) {
        fs.outputFileSync(destination, result, { encoding: 'utf8' })
      } else {
        fs.emptyDirSync(destination)
        fs.outputFileSync(path.join(destination, `${origin.replace(/(.*\/)*([^.]+).*/ig, '$2')}.html`), result, { encoding: 'utf8' })
      }
    } catch (e) {
      throw e
    }
  } else if (stat.isDirectory()) {
    let flag = false
    try {
      fs.emptyDirSync(destination)
      const files = fs.readdirSync(origin, { encoding: 'utf8' })
      files.forEach(file => {
        if (/\.md$/.test(file)) {
          const mdRaw = fs.readFileSync(file, { encoding: 'utf8' })
          const result = renderer.convert(mdRaw)
          const filename = path.join(destination, `${file.replace(/(.*\/)*([^.]+).*/ig, '$2')}.html`)
          fs.outputFileSync(filename, result, { encoding: 'utf8' })
          flag = true
        }
      })
    } catch (e) {
      throw e
    }
    if (!flag) {
      throw new Error('Can not get any md file in ' + origin)
    }
  }
}
