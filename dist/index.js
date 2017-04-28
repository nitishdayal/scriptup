#!/usr/bin/env node --harmony
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sup = require("commander");
var path = require("path");
var fs = require("fs");
var ch = require("chalk");
var utils_1 = require("./utils");
sup
    .version('0.0.1')
    .usage('<script_name> <cmd> [options]')
    .arguments('<script_name> <cmd>')
    .option('-p, --path <p>', "Path to directory containing package.json\n", function (p) { return path.resolve(p, 'package.json'); }, path.resolve('package.json'))
    .option('-pr --pre [pre]', "\n" + ch.cyan('As a flag') + ": Append 'pre' to <script_name>.\n\n" + ch.blue('W/ option') + ": Create additional script with 'pre' appended to <script_name>, using\n           [precommand] as the script to run BEFORE every call to <script_name>\n")
    .option('-po --post [post]', "\n" + ch.cyan('As a flag') + ": Append 'post' to <script_name>.\n\n" + ch.blue('W/ option') + ": Create additional script with 'post' appended to <script_name>, using\n           [postcommand] as the script to run AFTER every call to <script_name>\n")
    .option('-f --force', "\nThe default behavior of this tool is to error out if <script_name> or <cmd> already\nexists in the package.json file. By enabling the --force flag, any existing scripts with\n<script_name> will be over-written, and duplicate commands w/ different aliases will be allowed.\n")
    .action(function (cmdName, cmd) {
    var sPath = sup.path, pre = sup.pre, post = sup.post;
    utils_1.getPckg(sPath)
        .then(function (v) {
        var pckgFile = JSON.parse(v);
        var scriptArr = Object.keys(pckgFile.scripts);
        var scripts = scriptArr.map(function (k) { return pckgFile.scripts[k]; });
        if (!sup.force === true) {
            if (scriptArr.indexOf(cmdName) > 0) {
                utils_1.errMsg("\nThere is already a script named '" + cmdName + "' in file :\n\n  " + sPath + "\n\nIf you wish to edit the existing script, do some stuff\nI haven't thought of yet.");
            }
            else if (scripts.indexOf(cmd) > 0) {
                var cmdIdx = scripts.indexOf(cmd);
                utils_1.errMsg("This script already exists under the command name:\n              '" + ch.underline.magenta(scriptArr[cmdIdx]) + "'");
            }
            else {
                pckgFile.scripts[cmdName] = cmd;
                fs.writeFile(sPath, "" + JSON.stringify(pckgFile, null, 2), { encoding: 'utf-8' }, function (e) {
                    if (e) {
                        utils_1.errMsg(e.message);
                    }
                    else {
                        utils_1.validMsg(" Updated package.json at " + sPath + " to\ninclude script " + cmdName + ".");
                    }
                });
            }
        }
        else {
            pckgFile.scripts[cmdName] = cmd;
            fs.writeFile(sPath, "" + JSON.stringify(pckgFile, null, 2), { encoding: 'utf-8' }, function (e) {
                if (e) {
                    utils_1.errMsg(e.message);
                }
                else {
                    utils_1.validMsg(" Updated package.json at " + sPath + " to\ninclude script " + cmdName + ".");
                }
            });
        }
    })
        .catch(function (e) { return utils_1.errMsg(e); });
})
    .parse(process.argv);
//# sourceMappingURL=index.js.map