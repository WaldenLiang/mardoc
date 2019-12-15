import marked from 'marked'
import Handlebars from 'handlebars'
import { TocItem } from '../types'
import path from 'path'
import fs from 'fs-extra'

const defaultThemeLayout = path.join(__dirname, '../theme/default/layout.hbs')
const defaultThemeAssets = path.join(__dirname, '../theme/default/assets')

export default class Renderer {
  headerIndexCounter: number
  toc: Array<TocItem>
  themeLayout: string
  themeAssets: string

  constructor(theme?: string) {
    this.headerIndexCounter = 0
    this.toc = new Array<TocItem>()

    if (theme) {
      this.themeLayout = path.join(theme, '/layout.hbs')
      this.themeAssets = path.join(theme, '/assets')
    } else {
      this.themeLayout = defaultThemeLayout
      this.themeAssets = defaultThemeAssets
    }

    this.init()
  }

  init() {
    const renderer = new marked.Renderer()

    renderer.heading = (text, level) => {
      this.headerIndexCounter++
      const escapedText = `header-${level}-index-${this.headerIndexCounter}`

      if (level === 2) {
        this.toc.push({
          index: this.headerIndexCounter,
          text: text,
          level: level,
          href: `#${escapedText}`,
          children: new Array<TocItem>()
        })
      } else if (level === 3) {
        this.toc[this.toc.length - 1].children!.push({
          index: this.headerIndexCounter,
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
  }

  public convert(source: string) {
    source = marked(source)
    const layoutRaw = fs.readFileSync(this.themeLayout, { encoding: 'utf8' })
    const template = Handlebars.compile(layoutRaw)
    return template({ content: source, toc: this.toc })
  }

  public getThemeAssetsPath() {
    return this.themeAssets
  }
}
