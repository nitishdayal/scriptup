"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ch = require("chalk");
var fs = require("fs");
var path = require("path");
var constants_1 = require("./constants");
var makeJSON = function (p) { return JSON.stringify(p, null, 2); };
exports.makeJSON = makeJSON;
var validMsg = function (msg) { return console.info(fmtStr(['Success!', "" + msg])); };
exports.validMsg = validMsg;
var errMsg = function (msg) { return console.error(fmtStr(['ERROR:', " ", "" + msg], true)); };
exports.errMsg = errMsg;
var fmtStr = function (_a, err) {
    var _b = tslib_1.__read(_a), title = _b[0], msg = _b.slice(1);
    if (err === void 0) { err = false; }
    return err ? ch.bold.bgRed(title) + ch.red.apply(ch, tslib_1.__spread(msg)) : (ch.bold.bgBlue.white(title) + ch.green.apply(ch, tslib_1.__spread(msg)));
};
var getPckg = function (p) { return tslib_1.__awaiter(_this, void 0, void 0, function () { return tslib_1.__generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4, fs.readFileSync(path.resolve(p), 'utf-8')];
        case 1: return [2, _a.sent()];
    }
}); }); };
exports.getPckg = getPckg;
var writeFileCB = (function (e, sPath, cmdName, del) {
    if (e) {
        errMsg(e.message);
        process.exitCode = 1;
    }
    else {
        process.exitCode = 0;
        return del ? validMsg(constants_1.msgOpts.DEL_SUCCESS(sPath, cmdName)) :
            validMsg(constants_1.msgOpts.ADD_SUCCESS(sPath, cmdName));
    }
});
exports.wrCb = writeFileCB;
//# sourceMappingURL=index.js.map