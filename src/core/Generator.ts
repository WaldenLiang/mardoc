import fs from 'fs-extra'
import path from 'path'
import Renderer from './Renderer'
import { Options } from '../types'

export async function process(options: Options): Promise<void> {
  const { origin, destination, theme, toc, tocDepth, ignoreH1 } = options
  const renderer = new Renderer(toc!, ignoreH1!, tocDepth!, theme)

  try {
    const mdRaw = fs.readFileSync(origin, { encoding: 'utf8' })
    const result = renderer.convert(mdRaw)
    await fs.remove(destination)
    fs.mkdirpSync(destination)
    fs.writeFileSync(path.join(destination, 'index.html'), result, { encoding: 'utf8' })
    fs.copySync(renderer.getThemeAssetsPath(), path.join(destination, 'assets'))
  } catch (e) {
    throw e
  }
}
