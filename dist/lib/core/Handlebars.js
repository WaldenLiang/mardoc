"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var handlebars_1 = require("handlebars");
var CHandlebars = /** @class */ (function () {
    function CHandlebars() {
        this.init();
    }
    CHandlebars.prototype.init = function () {
        var self = this;
        handlebars_1.default.registerHelper('renderToc', function (array) {
            if (!array.length)
                return '<!-- toc empty -->';
            return "<nav class=\"toc\" id=\"toc\"><span id=\"closeBtn\" class=\"close-menu iconfont icon-gary\"></span>" + self.insetChildrenUl(array) + "</nav>";
        });
        handlebars_1.default.registerHelper('arrayNotEmpty', function (array, options) {
            if (array.length) {
                return options.fn();
            }
        });
    };
    CHandlebars.prototype.compile = function (source) {
        return handlebars_1.default.compile(source);
    };
    CHandlebars.prototype.insetChildrenUl = function (toc) {
        var _this = this;
        if (!toc.length)
            return '<!-- empty -->';
        var list = "";
        toc.forEach(function (item) {
            list += "<li><span><a href=\"" + item.href + "\">" + item.text + "</a></span>" + _this.insetChildrenUl(item.children) + "</li>";
        });
        return "<ul>" + list + "</ul>";
    };
    return CHandlebars;
}());
exports.default = CHandlebars;
//# sourceMappingURL=Handlebars.js.map