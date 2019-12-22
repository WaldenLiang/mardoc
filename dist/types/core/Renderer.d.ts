import { CodeBlockStyle, TocItem } from '../types';
export default class Renderer {
    headerIndexCounter: number;
    toc: Array<TocItem>;
    themeLayout: string;
    themeAssets: string;
    showToc: boolean;
    ignoreH1: boolean;
    tocDepth: number;
    codeBlockStyle: string;
    constructor(toc: boolean, ignoreH1: boolean, tocDepth: number, theme: string, codeBlockStyle: CodeBlockStyle);
    init(): void;
    convert(source: string): string;
}
