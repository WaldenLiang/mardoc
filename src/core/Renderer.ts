import marked from 'marked'
import { CodeBlockStyle, TocItem } from '../types'
import path from 'path'
import fs from 'fs-extra'
import CHandlebars from './Handlebars'
import hljs from 'highlight.js'

export default class Renderer {
  headerIndexCounter: number
  toc: Array<TocItem>
  themeLayout: string
  themeAssets: string
  showToc: boolean
  ignoreH1: boolean
  tocDepth: number
  codeBlockStyle: string

  constructor(toc: boolean, ignoreH1: boolean, tocDepth: number, theme: string, codeBlockStyle: CodeBlockStyle) {
    if (tocDepth > 6) throw new Error('The depth of toc should not larger than 6')

    this.headerIndexCounter = 0
    this.toc = new Array<TocItem>()
    this.ignoreH1 = ignoreH1
    this.showToc = toc
    this.tocDepth = tocDepth
    this.codeBlockStyle = codeBlockStyle

    this.themeLayout = path.join(theme, '/layout.hbs')
    this.themeAssets = path.join(theme, '/assets')

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

    renderer.code = (code, language) => {
      return `<pre class="hljs"><code class="language-${language}">${hljs.highlightAuto(code).value}</code></pre>`
    }

    marked.setOptions({
      renderer: renderer
    })
  }

  public convert(source: string) {
    this.toc = new Array<TocItem>()
    // convert md to html
    source = marked(source)
    const handlebars = new CHandlebars()
    // get the layout raw data
    const layoutRaw = fs.readFileSync(this.themeLayout, { encoding: 'utf8' })
    // get the code block style raw data
    let codeBlockStyleRaw: string
    try {
      codeBlockStyleRaw = fs.readFileSync(path.join(this.themeAssets, `/code-block-styles/${this.codeBlockStyle}.css`), { encoding: 'utf8' })
    } catch (e) {
      throw new Error(`Can not resolve the code block style named ${this.codeBlockStyle}`)
    }
    const template = handlebars.compile(layoutRaw)
    // fs.writeFileSync(path.join(process.cwd(), '/tmpToc/toc.json'), JSON.stringify(this.toc), { encoding: 'utf8' })
    return template({ content: source, toc: this.toc, codeBlockStyle: codeBlockStyleRaw })
  }
}
