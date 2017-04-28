"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ch = require("chalk");
var fs = require("fs");
var path = require("path");
var errMsg = function (msg) {
    return console.error(fmt(['ERROR:', "" + msg], true)) && process.exit(0);
};
exports.errMsg = errMsg;
var fmt = function (_a, err) {
    var _b = tslib_1.__read(_a), title = _b[0], msg = _b.slice(1);
    if (err === void 0) { err = false; }
    switch (err) {
        case true:
            return ch.bold.bgRed(title) + ch.red.apply(ch, tslib_1.__spread(msg));
        default:
            return (ch.bold.bgBlue.white(title) + ch.green.apply(ch, tslib_1.__spread(msg)));
    }
};
var validMsg = function (msg) { return console.info(fmt(['Success!', "" + msg])); };
exports.validMsg = validMsg;
function getPckg(p) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var pckgJson;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, fs.readFileSync(path.resolve(p), 'utf-8')];
                case 1:
                    pckgJson = _a.sent();
                    return [2, pckgJson];
            }
        });
    });
}
exports.getPckg = getPckg;
//# sourceMappingURL=utils.js.map