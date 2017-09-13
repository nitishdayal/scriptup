#!/usr/bin/env node --harmony
"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var ch = require("chalk");
var sup = require("commander");
var fs = require("fs");
var path = require("path");
var utils_1 = require("./utils");
var constants_1 = require("./utils/constants");
var scriptsToDelete = [];
var scriptObjs = [];
var addPre = function (val) {
    var rest = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        rest[_i - 1] = arguments[_i];
    }
    return console.log(val, rest);
};
sup
    .version('0.0.1')
    .usage('<script_name> <cmd> [option] [cmd]')
    .arguments('<script_name> [cmd]')
    .option('-p, --path <p>', constants_1.cmdOpts.PATH, function (p) { return path.resolve(p, 'package.json'); }, path.resolve('package.json'))
    .option('-e, --pre [cmd]', constants_1.cmdOpts.PRE)
    .action(function (cmd) {
    return sup.pre &&
        scriptObjs.push({
            cmd: sup.args[0] ? sup.pre : cmd,
            cmdName: "pre" + (sup.args[0] || sup.pre)
        });
})
    .option('-o, --post [cmd]', constants_1.cmdOpts.POST)
    .action(function (cmd) {
    return sup.post &&
        scriptObjs.push({
            cmd: sup.args[0] ? sup.post : cmd,
            cmdName: "post" + (sup.args[0] || sup.post)
        });
})
    .option('-r, --remove [cmds]', constants_1.cmdOpts.REMOVE, function (cmd) {
    return utils_1.getPkg(sup.path).then(function (v) {
        var pckgFile = JSON.parse(v);
        var scripts = pckgFile.scripts;
        try {
            delete scripts[cmd];
        }
        catch (e) {
            return utils_1.errMsg(e);
        }
        pckgFile = utils_1.makeJSON(tslib_1.__assign({}, pckgFile, { scripts: scripts }));
        fs.writeFile(sup.path, pckgFile, { encoding: 'utf-8' }, function (e) {
            return utils_1.wrCb(e, sup.path.toString(), cmd, true);
        });
    });
})
    .action(function (cmdName, cmd) {
    scriptObjs =
        (cmd && cmdName && tslib_1.__spread(scriptObjs, [{ cmd: cmd, cmdName: cmdName }])) || scriptObjs;
    utils_1.getPkg(sup.path).then(function (v) {
        var pckgFile = JSON.parse(v);
        var scripts = pckgFile.scripts;
        scriptObjs.forEach(function (_a) {
            var cmd = _a.cmd, cmdName = _a.cmdName;
            scripts = tslib_1.__assign({}, scripts, (_b = {}, _b[cmdName] = cmd, _b));
            var _b;
        });
        pckgFile = utils_1.makeJSON(tslib_1.__assign({}, pckgFile, { scripts: scripts }));
        fs.writeFile(sup.path, pckgFile, { encoding: 'utf-8' }, function (e) {
            return utils_1.wrCb(e, sup.path.toString(), scriptObjs.map(function (scr) { return scr.cmdName; }));
        });
    });
})
    .on('--help', function () {
    return console.log(ch.bgRed(ch.bold('\n' +
        "IF YOU PASS ARGUMENTS IN AN UNEXPECTED ORDER, I WILL BREAK YOUR PACKAGE.JSON :)")));
})
    .parse(process.argv);
//# sourceMappingURL=index.js.map