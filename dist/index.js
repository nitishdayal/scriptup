#!/usr/bin/env node --harmony
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sup = require("commander");
var path = require("path");
var fs = require("fs");
var utils_1 = require("./utils");
sup
    .version('0.0.1')
    .arguments('<script_name> <script>')
    .option('-p, --path <p>', 'Path to directory containing package.json', function (p) { return path.resolve(p, 'package.json'); })
    .option('-pr, --pre [pre]', 'This command will run before every call to the main script')
    .option('-po, --post [post]', 'This command will run after every call to the main script')
    .action(function (cmdName, cmd) {
    var sPath = sup.path, pre = sup.pre, post = sup.post;
    utils_1.getPckg(sPath)
        .then(function (v) {
        var pckgFile = JSON.parse(v);
        var scriptArr = Object.keys(pckgFile.scripts);
        if (scriptArr.indexOf(cmdName) > 0) {
            utils_1.errMsg("\nThere is already a script named '" + cmdName + "'\nin file '" + sPath + "'. If you wish to\nedit the existing script, do some stuff I haven't\nthought of yet.");
        }
        else {
            pckgFile.scripts[cmdName] = cmd;
            fs.writeFile(sPath, "" + JSON.stringify(pckgFile, null, 2), {
                encoding: 'utf-8'
            }, function (e) {
                if (e) {
                    utils_1.errMsg(e.message);
                }
                else {
                    utils_1.validMsg("\nUpdated package.json at " + sPath + " to\ninclude script " + cmdName + ".");
                }
            });
        }
    })
        .catch(function (e) { return utils_1.errMsg(e, process); });
})
    .parse(process.argv);
//# sourceMappingURL=index.js.map