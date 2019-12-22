import { generate } from './core/Generator'
import { Options } from './types'
import path from 'path'

export async function mardoc(options: Options): Promise<void> {
  const {
    origin = './README.md',
    destination = './docs',
    toc = false,
    ignoreH1 = true,
    tocDepth = 2,
    theme = path.join(__dirname, '../theme/default'),
    codeBlockStyle = 'github'
  } = options

  try {
    await generate({ origin, destination, toc, ignoreH1, tocDepth, theme, codeBlockStyle })
  } catch (e) {
    throw e
  }
}
