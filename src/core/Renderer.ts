import marked from 'marked'
import { TocItem } from '../types'
import path from 'path'
import fs from 'fs-extra'
import CHandlebars from './Handlebars'

const defaultThemeLayout = path.join(__dirname, '../theme/default/layout.hbs')
const defaultThemeAssets = path.join(__dirname, '../theme/default/assets')

export default class Renderer {
  headerIndexCounter: number
  toc: Array<TocItem>
  themeLayout: string
  themeAssets: string
  showToc: boolean
  ignoreH1: boolean
  tocDepth: number

  constructor(toc: boolean, ignoreH1: boolean, tocDepth: number, theme?: string) {
    this.headerIndexCounter = 0
    this.toc = new Array<TocItem>()
    this.ignoreH1 = ignoreH1
    this.showToc = toc
    this.tocDepth = tocDepth

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

      if (this.showToc) {
        let allowHeaderLevel = 2

        if (!this.ignoreH1) {
          allowHeaderLevel = 1
        }

        if (level >= allowHeaderLevel && level < (this.tocDepth + allowHeaderLevel)) {
          const item = {
            index: this.headerIndexCounter,
            text: text.replace(/<(?:[^"'>]|(["'])[^"']*\1)*>/g, ''),
            level: level,
            href: `#${escapedText}`,
            children: new Array<TocItem>()
          }
          const delta = level - allowHeaderLevel
          let target = this.toc
          for (let i = 0; i < delta; i++) {
            if (!target.length) break // 如果跳级，跳出
            if (target[target.length - 1].level === level) break // 如果跳级，并且根上一个目录等级相同，跳出
            target = target[target.length - 1].children
          }
          target.push(item)
        }
      }

      return `<h${level} id="${escapedText}" style="z-index: ${999 - this.headerIndexCounter}"><span>${text}<a class="anchor" href="#${escapedText}"><span class="iconfont icon-anchor"></span></a></span></h${level}>`
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
    const handlebars = new CHandlebars()
    const layoutRaw = fs.readFileSync(this.themeLayout, { encoding: 'utf8' })
    const template = handlebars.compile(layoutRaw)
    // fs.writeFileSync(path.join(process.cwd(), '/tmpToc/toc.json'), JSON.stringify(this.toc), { encoding: 'utf8' })
    return template({ content: source, toc: this.toc })
  }

  public getThemeAssetsPath() {
    return this.themeAssets
  }
}
