#!/usr/bin/env node --harmony
import sup = require('commander');
import path = require('path');
import fs = require('fs');
import ch = require('chalk');
import { errMsg, getPckg, validMsg } from './utils'

sup
  .version('0.0.1')
  .usage('<script_name> <cmd> [options]')
  .arguments('<script_name> <cmd>')
  .option(
  '-p, --path <p>',
  `Path to directory containing package.json
`,
  (p) => path.resolve(p, 'package.json'),
  path.resolve('package.json')
  )
  .option(
  '-pr --pre [pre]',
  `
${ch.cyan('As a flag')}: Append 'pre' to <script_name>.

${ch.blue('W/ option')}: Create additional script with 'pre' appended to <script_name>, using
           [precommand] as the script to run BEFORE every call to <script_name>
`
  )
  .option(
  '-po --post [post]',
  `
${ch.cyan('As a flag')}: Append 'post' to <script_name>.

${ch.blue('W/ option')}: Create additional script with 'post' appended to <script_name>, using
           [postcommand] as the script to run AFTER every call to <script_name>
`
  )
  .option(
  '-f --force',
  `
The default behavior of this tool is to error out if <script_name> or <cmd> already
exists in the package.json file. By enabling the --force flag, any existing scripts with
<script_name> will be over-written, and duplicate commands w/ different aliases will be allowed.
`
  )
  .action((cmdName: string, cmd: string) => {

    const { path: sPath, pre, post } = sup;

    getPckg(sPath)
      .then((v: string) => {
        const pckgFile = JSON.parse(v);

        const scriptArr = Object.keys(pckgFile.scripts)
        const scripts = scriptArr.map((k) => pckgFile.scripts[k])

        if (!sup.force === true) {
          if (scriptArr.indexOf(cmdName) > 0) {
            errMsg(`
There is already a script named '${cmdName}' in file :

  ${sPath}

If you wish to edit the existing script, do some stuff
I haven't thought of yet.`);
          } else if (scripts.indexOf(cmd) > 0) {
            const cmdIdx = scripts.indexOf(cmd);
            errMsg(
              `This script already exists under the command name:
              '${ch.underline.magenta(scriptArr[cmdIdx])}'`);
          } else {
            pckgFile.scripts[cmdName] = cmd

            fs.writeFile(
              sPath,
              `${JSON.stringify(pckgFile, null, 2)}`,
              { encoding: 'utf-8' },
              (e) => {
                if (e) {
                  errMsg(e.message);
                } else {
                  validMsg(` Updated package.json at ${sPath} to
include script ${cmdName}.`
                  );
                }
              })
          }
        } else {
          pckgFile.scripts[cmdName] = cmd

          fs.writeFile(
            sPath,
            `${JSON.stringify(pckgFile, null, 2)}`,
            { encoding: 'utf-8' },
            (e) => {
              if (e) {
                errMsg(e.message);
              } else {
                validMsg(` Updated package.json at ${sPath} to
include script ${cmdName}.`
                );
              }
            })
        }
      })
      .catch((e: any) => errMsg(e));
  })
  .parse(process.argv);
