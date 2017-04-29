#!/usr/bin/env node --harmony
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sup = require("commander");
var path = require("path");
var fs = require("fs");
var ch = require("chalk");
var utils_1 = require("./utils");
sup.version('0.0.1')
    .usage('<script_name> <cmd> [options]')
    .arguments('<script_name> <cmd>')
    .option('-p, --path <p>', "Path to directory containing package.json\n", function (p) { return path.resolve(p, 'package.json'); }, path.resolve('package.json'))
    .option('-pr --pre [pre]', "\n" + ch.cyan('As a flag') + ": Append 'pre' to <script_name>.\n\n" + ch.blue('W/ option') + ": Create additional script with 'pre' appended to <script_name>, using\n           [precommand] as the script to run BEFORE every call to <script_name>\n")
    .option('-po --post [post]', "\n" + ch.cyan('As a flag') + ": Append 'post' to <script_name>.\n\n" + ch.blue('W/ option') + ": Create additional script with 'post' appended to <script_name>, using\n           [postcommand] as the script to run AFTER every call to <script_name>\n")
    .option('-f --force', "\nThe default behavior of this tool is to error out if <script_name> or <cmd> already\nexists in the package.json file. By enabling the --force flag, any existing scripts with\n<script_name> will be over-written, and duplicate commands w/ different aliases will be allowed.\n")
    .action(function (cmdName, cmd) {
    var sPath = sup.path, pre = sup.pre, post = sup.post, force = sup.force;
    utils_1.getPckg(sPath)
        .then(function (v) {
        var pckgFile = JSON.parse(v);
        if (!force === true) {
            var scripts = Object.values(pckgFile.scripts);
            var scriptArr = Object.keys(pckgFile.scripts);
            if (scriptArr.indexOf(cmdName) > 0) {
                utils_1.errMsg(utils_1.msgOpts.SCRIPT_EXISTS(cmdName, sPath));
            }
            else if (scripts.indexOf(cmd) > 0) {
                utils_1.errMsg(utils_1.msgOpts.CMD_EXISTS(scriptArr[scripts.indexOf(cmd)]));
            }
            else {
                pckgFile.scripts[cmdName] = cmd;
                fs.writeFile(sPath, "" + JSON.stringify(pckgFile, null, 2), { encoding: 'utf-8' }, function (e) { return utils_1.wrCb(e, sPath.toString(), cmdName); });
            }
        }
        else {
            pckgFile.scripts[cmdName] = cmd;
            fs.writeFile(sPath, "" + JSON.stringify(pckgFile, null, 2), { encoding: 'utf-8' }, function (e) { return utils_1.wrCb(e, sPath.toString(), cmdName); });
        }
    })
        .catch(function (e) { return utils_1.errMsg(e); });
})
    .parse(process.argv);
//# sourceMappingURL=index.js.map