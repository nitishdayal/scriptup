"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ch = require("chalk");
var fs = require("fs");
var path = require("path");
var errMsg = function (msg) {
    return console.error(fmtStr(['ERROR:', "" + msg], true));
};
exports.errMsg = errMsg;
var fmtStr = function (_a, err) {
    var _b = tslib_1.__read(_a), title = _b[0], msg = _b.slice(1);
    if (err === void 0) { err = false; }
    switch (err) {
        case true:
            return ch.bold.bgRed(title) + ch.red.apply(ch, tslib_1.__spread(msg));
        default:
            return (ch.bold.bgBlue.white(title) + ch.green.apply(ch, tslib_1.__spread(msg)));
    }
};
var validMsg = function (msg) { return console.info(fmtStr(['Success!', "" + msg])); };
exports.validMsg = validMsg;
var getPckg = function (p) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var pckgJson;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, fs.readFileSync(path.resolve(p), 'utf-8')];
            case 1:
                pckgJson = _a.sent();
                return [2, pckgJson];
        }
    });
}); };
exports.getPckg = getPckg;
var msgOpts = {
    CMD_EXISTS: function (cmdName) { return "\nThis script already exists under the command name:\n\n  '" + ch.underline.magenta(cmdName) + "'\n\nIf you want to overwrite the existing script, pass\nthe --force flag as an option."; },
    SCRIPT_EXISTS: function (a, b) { return "\nThere is already a script named '" + a + "' in file:\n\n  " + b + "\n\nIf you want to overwrite the existing script, pass\nthe --force flag as an option."; },
    SUCCESS: function (path, cmdName) { return "\nUpdated package.json at " + ch.cyan(path) + " to include script '" + cmdName + ".'"; }
};
exports.msgOpts = msgOpts;
var writeFileCB = (function (e, sPath, cmdName) {
    if (e) {
        errMsg(e.message);
        process.exitCode = 1;
    }
    else {
        validMsg(msgOpts.SUCCESS(sPath, cmdName));
    }
});
exports.wrCb = writeFileCB;
//# sourceMappingURL=utils.js.map