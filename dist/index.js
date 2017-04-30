#!/usr/bin/env node --harmony
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sup = require("commander");
var path = require("path");
var fs = require("fs");
var utils_1 = require("./utils");
var constants_1 = require("./utils/constants");
sup.version('0.0.1')
    .usage('<script_name> [cmd...] [options]')
    .arguments('<script_name> [cmd]')
    .option('-o, --post [post]', constants_1.cmdOpts.POST)
    .option('-e, --pre [pre]', constants_1.cmdOpts.PRE)
    .option('-p, --path <p>', constants_1.cmdOpts.PATH, function (p) { return path.resolve(p, 'package.json'); }, path.resolve('package.json'))
    .option('-r --remove', constants_1.cmdOpts.REMOVE)
    .option('-f, --force', constants_1.cmdOpts.FORCE)
    .action(function (cmdName, cmd) {
    var sPath = sup.path, pre = sup.pre, post = sup.post, force = sup.force, remove = sup.remove;
    var nScripts = [{ cmdName: cmdName, cmd: cmd }];
    utils_1.getPckg(sPath)
        .then(function (v) {
        var pckgFile = JSON.parse(v);
        var scripts = Object.values(pckgFile.scripts);
        var scriptArr = Object.keys(pckgFile.scripts);
        if (remove) {
            var err_1 = [];
            var delArgs_1 = sup.args[2].rawArgs.splice(3);
            delArgs_1.forEach(function (arg) {
                if (scriptArr.indexOf(arg) < 0) {
                    err_1.push(constants_1.msgOpts.DEL_ERR(sPath, arg, scriptArr));
                }
            });
            if (err_1.length > 0) {
                err_1.forEach(function (e) { return utils_1.errMsg(e); });
                return process.exitCode = 1;
            }
            delArgs_1.forEach(function (cmd) {
                try {
                    delete pckgFile.scripts[cmd];
                }
                catch (e) {
                    return utils_1.errMsg(e);
                }
            });
            return fs.writeFile(sPath, utils_1.makeJSON(pckgFile), { encoding: 'utf-8' }, function (e) { return utils_1.wrCb(e, sPath.toString(), delArgs_1, remove); });
        }
        if (pre) {
            var preCmd = "pre" + cmdName;
            if (pre === true) {
                if (!post) {
                    nScripts[0].cmdName = preCmd;
                }
                else {
                    return utils_1.errMsg(constants_1.msgOpts.PRE_POST(preCmd));
                }
            }
            else {
                nScripts.push({
                    cmd: pre,
                    cmdName: preCmd
                });
            }
        }
        if (post) {
            var pstCmd = "post" + cmdName;
            if (post === true) {
                nScripts[0].cmdName = pstCmd;
            }
            else {
                nScripts.push({
                    cmd: post,
                    cmdName: pstCmd
                });
            }
        }
        if (!force === true) {
            if (scriptArr.indexOf(cmdName) > 0) {
                return utils_1.errMsg(constants_1.msgOpts.SCRIPT_EXISTS(cmdName, sPath));
            }
            else if (scripts.indexOf(cmd) > 0) {
                return utils_1.errMsg(constants_1.msgOpts.CMD_EXISTS(scriptArr[scripts.indexOf(cmd)]));
            }
        }
        nScripts = nScripts.length < 2 ? nScripts : nScripts.slice(1);
        nScripts.forEach(function (_a) {
            var cmd = _a.cmd, cmdName = _a.cmdName;
            pckgFile.scripts[cmdName] = cmd;
        });
        console.log(nScripts);
        fs.writeFile(sPath, utils_1.makeJSON(pckgFile), { encoding: 'utf-8' }, function (e) { return utils_1.wrCb(e, sPath.toString(), nScripts.map(function (scr) { return scr.cmdName; })); });
    })
        .catch(function (e) { return utils_1.errMsg(e); });
})
    .parse(process.argv);
//# sourceMappingURL=index.js.map