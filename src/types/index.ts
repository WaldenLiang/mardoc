export interface TocItem {
  index: number
  level: number
  text: string
  href: string
  children?: Array<TocItem>
}
