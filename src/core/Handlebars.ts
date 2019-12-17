import Handlebars from 'handlebars'
import { TocItem } from '../types'

export default class CHandlebars {
  constructor() {
    this.init()
  }

  private init() {
    const self = this
    Handlebars.registerHelper('renderToc', function(array: Array<TocItem>) {
      if (!array.length) return '<!-- toc empty -->'
      return `<nav class="toc">${self.insetChildrenUl(array)}</nav>`
    })
  }

  public compile(source: string) {
    return Handlebars.compile(source)
  }

  private insetChildrenUl(toc: Array<TocItem>) {
    if (!toc.length) return '<!-- empty -->'
    let list = ``
    toc.forEach(item => {
      list += `<li><span><i></i><a href="${item.href}">${item.text}</a></span>${this.insetChildrenUl(item.children)}</li>`
    })
    return `<ul>${list}</ul>`
  }
}
