import fs from 'fs-extra'
import path from 'path'
import Renderer from './core/Renderer'

export async function process(o: string, d: string, theme?: string): Promise<void> {
  const renderer = new Renderer(theme)

  try {
    const mdRaw = fs.readFileSync(o, { encoding: 'utf8' })
    const result = renderer.convert(mdRaw)
    await fs.remove(d)
    fs.mkdirpSync(d)
    fs.writeFileSync(path.join(d, 'index.html'), result, { encoding: 'utf8' })
    fs.copySync(renderer.getThemeAssetsPath(), path.join(d, 'assets'))
    console.log('generate successfully')
  } catch (e) {
    throw e
  }
}
