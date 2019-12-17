export interface TocItem {
    index: number;
    level: number;
    text: string;
    href: string;
    children: Array<TocItem>;
}
export interface Options {
    origin: string;
    destination: string;
    toc?: boolean;
    ignoreH1?: boolean;
    tocDepth?: number;
    theme?: string;
}
