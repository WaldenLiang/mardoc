import { TocItem } from '../types';
export default class Renderer {
    headerIndexCounter: number;
    toc: Array<TocItem>;
    themeLayout: string;
    themeAssets: string;
    showToc: boolean;
    ignoreH1: boolean;
    tocDepth: number;
    constructor(toc: boolean, ignoreH1: boolean, tocDepth: number, theme?: string);
    init(): void;
    convert(source: string): string;
    getThemeAssetsPath(): string;
}
