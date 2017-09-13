"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var ch = require("chalk");
var msgOpts = {
    ADD_SUCCESS: function (path, cmdName) { return "\nUpdated package.json at " + ch.cyan(path) + " to include script/s:\n\n '" + cmdName.toString().replace(/,/g, "', '") + "'"; },
    CMD_EXISTS: function (cmdName) { return "\nThis script already exists under the command name:\n\n  '" + ch.underline.magenta(cmdName) + "'\n\nIf you want to overwrite the existing script, pass\nthe --force flag as an option."; },
    DEL_ERR: function (path, cmdName, scrArr) {
        return "\nCould not find '" + cmdName + "' in " + ch.cyan(path) + ". Here are the scripts I found:\n\n  " + (_a = ch.inverse).cyan.apply(_a, tslib_1.__spread(scrArr)) + "\n";
        var _a;
    },
    DEL_SUCCESS: function (path, cmdName) { return "\nUpdated package.json at " + ch.cyan(path) + " and removed script/s:\n\n '" + cmdName.toString().replace(/,/g, "', '") + "'"; },
    PRE_POST: function (cmdName) { return "\nCannot provide both " + ch.inverse.blue('pre') + " and " + ch.inverse.magenta('post') + "\nflags as boolean options. Did you _REALLY_ want\n'" + cmdName + "' and '" + cmdName.replace('pre', 'post') + "' scripts with the same command?\n\n" + "Because we don't do that here sry ¯\\_(ツ)_/¯ \n"; },
    SCRIPT_EXISTS: function (cmdName, exists) { return "\nThere is already a script named '" + cmdName + "' in file:\n\n  " + exists + "\n\nIf you want to overwrite the existing script, pass\nthe --force flag as an option."; }
};
exports.msgOpts = msgOpts;
var cmdOpts = {
    FORCE: "\nThe default behavior of this tool is to error out if <script_name> or <cmd> already\nexists in the package.json file. By enabling the --force flag, any existing scripts with\n<script_name> will be over-written, and duplicate commands w/ different aliases will be allowed.\n",
    PATH: "Path to directory containing package.json\n",
    POST: "\n" + ch.cyan('As a flag') + ": Append 'post' to <script_name>.\n\n" + ch.blue('W/ option') + ": Create additional script with 'post' appended to <script_name>, using\n           [postcommand] as the script to run AFTER every call to <script_name>\n",
    PRE: "\n" + ch.cyan('As a flag') + ": Append 'pre' to <script_name>.\n\n" + ch.blue('W/ option') + ": Create additional script with 'pre' appended to <script_name>, using\n           [precommand] as the script to run BEFORE every call to <script_name>\n",
    REMOVE: "\nRemove a command from the package.json scripts with the command name provided.\n"
};
exports.cmdOpts = cmdOpts;
//# sourceMappingURL=constants.js.map