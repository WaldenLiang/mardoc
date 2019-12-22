"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var Renderer_1 = require("./Renderer");
function generate(options) {
    return __awaiter(this, void 0, void 0, function () {
        var origin, destination, theme, toc, tocDepth, ignoreH1, codeBlockStyle, renderer, stat, mdRaw, result, flag_1, files;
        return __generator(this, function (_a) {
            origin = options.origin, destination = options.destination, theme = options.theme, toc = options.toc, tocDepth = options.tocDepth, ignoreH1 = options.ignoreH1, codeBlockStyle = options.codeBlockStyle;
            try {
                // Instantiation
                renderer = new Renderer_1.default(toc, ignoreH1, tocDepth, theme, codeBlockStyle);
            }
            catch (e) {
                throw e;
            }
            try {
                stat = fs_extra_1.default.lstatSync(origin);
            }
            catch (e) {
                throw e;
            }
            if (stat.isFile()) {
                if (!/\.md$/.test(origin)) {
                    throw new Error(path_1.default.join(process.cwd(), origin) + " is not a md format file.");
                }
                try {
                    mdRaw = fs_extra_1.default.readFileSync(origin, { encoding: 'utf8' });
                    result = renderer.convert(mdRaw);
                    if (/\.html$/.test(destination)) {
                        fs_extra_1.default.outputFileSync(destination, result, { encoding: 'utf8' });
                    }
                    else {
                        fs_extra_1.default.emptyDirSync(destination);
                        fs_extra_1.default.outputFileSync(path_1.default.join(destination, origin.replace(/(.*\/)*([^.]+).*/ig, '$2') + ".html"), result, { encoding: 'utf8' });
                    }
                }
                catch (e) {
                    throw e;
                }
            }
            else if (stat.isDirectory()) {
                flag_1 = false;
                try {
                    fs_extra_1.default.emptyDirSync(destination);
                    files = fs_extra_1.default.readdirSync(origin, { encoding: 'utf8' });
                    files.forEach(function (file) {
                        if (/\.md$/.test(file)) {
                            var mdRaw = fs_extra_1.default.readFileSync(file, { encoding: 'utf8' });
                            var result = renderer.convert(mdRaw);
                            var filename = path_1.default.join(destination, file.replace(/(.*\/)*([^.]+).*/ig, '$2') + ".html");
                            fs_extra_1.default.outputFileSync(filename, result, { encoding: 'utf8' });
                            flag_1 = true;
                        }
                    });
                }
                catch (e) {
                    throw e;
                }
                if (!flag_1) {
                    throw new Error('Can not find any md file in ' + path_1.default.join(process.cwd(), origin));
                }
            }
            return [2 /*return*/];
        });
    });
}
exports.generate = generate;
//# sourceMappingURL=Generator.js.map