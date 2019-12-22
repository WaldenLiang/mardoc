"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var marked_1 = require("marked");
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var Handlebars_1 = require("./Handlebars");
var highlight_js_1 = require("highlight.js");
var Renderer = /** @class */ (function () {
    function Renderer(toc, ignoreH1, tocDepth, theme, codeBlockStyle) {
        if (tocDepth > 6)
            throw new Error('The depth of toc should not larger than 6');
        this.headerIndexCounter = 0;
        this.toc = new Array();
        this.ignoreH1 = ignoreH1;
        this.showToc = toc;
        this.tocDepth = tocDepth;
        this.codeBlockStyle = codeBlockStyle;
        this.themeLayout = path_1.default.join(theme, '/layout.hbs');
        this.themeAssets = path_1.default.join(theme, '/assets');
        this.init();
    }
    Renderer.prototype.init = function () {
        var _this = this;
        var renderer = new marked_1.default.Renderer();
        renderer.heading = function (text, level) {
            _this.headerIndexCounter++;
            var escapedText = "header-" + level + "-index-" + _this.headerIndexCounter;
            if (_this.showToc) {
                var allowHeaderLevel = 2;
                if (!_this.ignoreH1) {
                    allowHeaderLevel = 1;
                }
                if (level >= allowHeaderLevel && level < (_this.tocDepth + allowHeaderLevel)) {
                    var item = {
                        index: _this.headerIndexCounter,
                        text: text.replace(/<(?:[^"'>]|(["'])[^"']*\1)*>/g, ''),
                        level: level,
                        href: "#" + escapedText,
                        children: new Array()
                    };
                    var delta = level - allowHeaderLevel;
                    var target = _this.toc;
                    for (var i = 0; i < delta; i++) {
                        if (!target.length)
                            break; // 如果跳级，跳出
                        if (target[target.length - 1].level === level)
                            break; // 如果跳级，并且根上一个目录等级相同，跳出
                        target = target[target.length - 1].children;
                    }
                    target.push(item);
                }
            }
            return "<h" + level + " id=\"" + escapedText + "\" style=\"z-index: " + (999 - _this.headerIndexCounter) + "\"><span>" + text + "<a class=\"anchor\" href=\"#" + escapedText + "\"><span class=\"iconfont icon-anchor\"></span></a></span></h" + level + ">";
        };
        renderer.code = function (code, language) {
            return "<pre class=\"hljs\"><code class=\"language-" + language + "\">" + highlight_js_1.default.highlightAuto(code).value + "</code></pre>";
        };
        marked_1.default.setOptions({
            renderer: renderer
        });
    };
    Renderer.prototype.convert = function (source) {
        this.toc = new Array();
        // convert md to html
        source = marked_1.default(source);
        var handlebars = new Handlebars_1.default();
        // get the layout raw data
        var layoutRaw = fs_extra_1.default.readFileSync(this.themeLayout, { encoding: 'utf8' });
        // get the code block style raw data
        var codeBlockStyleRaw;
        try {
            codeBlockStyleRaw = fs_extra_1.default.readFileSync(path_1.default.join(this.themeAssets, "/code-block-styles/" + this.codeBlockStyle + ".css"), { encoding: 'utf8' });
        }
        catch (e) {
            throw new Error("Can not resolve the code block style named \"" + this.codeBlockStyle + "\"");
        }
        var template = handlebars.compile(layoutRaw);
        // fs.writeFileSync(path.join(process.cwd(), '/tmpToc/toc.json'), JSON.stringify(this.toc), { encoding: 'utf8' })
        return template({ content: source, toc: this.toc, codeBlockStyle: codeBlockStyleRaw });
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=Renderer.js.map