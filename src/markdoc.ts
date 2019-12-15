import fs from 'fs-extra'
import path from 'path'
import marked from 'marked'
import Handlebars from 'handlebars'
import { TocItem } from './types'

const cwd = process.cwd()
console.log(cwd)
const defaultLayout = path.join(cwd, '/theme/default/layout.hbs')
const themeAssets = path.join(cwd, '/theme/default/assets')
const layoutResource = fs.readFileSync(defaultLayout, { encoding: 'utf8' })

const renderer = new marked.Renderer()
let headerIndexCounter: number = 0
const toc = new Array<TocItem>()

renderer.heading = (text, level) => {
  headerIndexCounter++
  const escapedText = `header-${level}-index-${headerIndexCounter}`

  if (level === 2) {
    toc.push({
      index: headerIndexCounter,
      text: text,
      level: level,
      href: `#${escapedText}`,
      children: new Array<TocItem>()
    })
  } else if (level === 3) {
    toc[toc.length - 1].children!.push({
      index: headerIndexCounter,
      text: text,
      level: level,
      href: `#${escapedText}`
    })
  }

  return `<h${level} id="${escapedText}">
            ${text}
            <a class="anchor" href="#${escapedText}">
              <span class="iconfont icon-anchor"></span>
            </a>
          </h${level}>`
}

marked.setOptions({
  renderer: renderer,
  highlight(code) {
    return require('highlight.js').highlightAuto(code).value
  }
})

const template = Handlebars.compile(layoutResource)

export async function markdoc(md: string, out: string): Promise<void> {
  const mdResource = fs.readFileSync(md, { encoding: 'utf8' })
  const html = marked(mdResource)
  const result = template({ content: html, toc: toc })

  try {
    await fs.remove(out)
    fs.mkdirpSync(out)
    fs.writeFileSync(path.join(out, 'index.html'), result, { encoding: 'utf8' })
    fs.copySync(themeAssets, path.join(out, 'assets'))
    console.log('generate successfully')
  } catch (e) {
    throw e
  }
}
