"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var marked_1 = require("marked");
var path_1 = require("path");
var fs_extra_1 = require("fs-extra");
var Handlebars_1 = require("./Handlebars");
var defaultThemeLayout = path_1.default.join(__dirname, '../theme/default/layout.hbs');
var defaultThemeAssets = path_1.default.join(__dirname, '../theme/default/assets');
var Renderer = /** @class */ (function () {
    function Renderer(toc, ignoreH1, tocDepth, theme) {
        this.headerIndexCounter = 0;
        this.toc = new Array();
        this.ignoreH1 = ignoreH1;
        this.showToc = toc;
        this.tocDepth = tocDepth;
        if (theme) {
            this.themeLayout = path_1.default.join(theme, '/layout.hbs');
            this.themeAssets = path_1.default.join(theme, '/assets');
        }
        else {
            this.themeLayout = defaultThemeLayout;
            this.themeAssets = defaultThemeAssets;
        }
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
                        text: text,
                        level: level,
                        href: "#" + escapedText,
                        children: new Array()
                    };
                    var delta = level - allowHeaderLevel;
                    var target = _this.toc;
                    for (var i = 0; i < delta; i++) {
                        target = target[target.length - 1].children;
                    }
                    target.push(item);
                }
            }
            return "<h" + level + " id=\"" + escapedText + "\" style=\"z-index: " + (999 - _this.headerIndexCounter) + "\"><span>" + text + "<a class=\"anchor\" href=\"#" + escapedText + "\"><span class=\"iconfont icon-anchor\"></span></a></span></h" + level + ">";
        };
        marked_1.default.setOptions({
            renderer: renderer,
            highlight: function (code) {
                return require('highlight.js').highlightAuto(code).value;
            }
        });
    };
    Renderer.prototype.convert = function (source) {
        source = marked_1.default(source);
        var handlebars = new Handlebars_1.default();
        var layoutRaw = fs_extra_1.default.readFileSync(this.themeLayout, { encoding: 'utf8' });
        var template = handlebars.compile(layoutRaw);
        // fs.writeFileSync(path.join(process.cwd(), '/tmpToc/toc.json'), JSON.stringify(this.toc), { encoding: 'utf8' })
        return template({ content: source, toc: this.toc });
    };
    Renderer.prototype.getThemeAssetsPath = function () {
        return this.themeAssets;
    };
    return Renderer;
}());
exports.default = Renderer;
//# sourceMappingURL=Renderer.js.map