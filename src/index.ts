#!/usr/bin/env node --harmony
import sup = require('commander');
import path = require('path');
import fs = require('fs')
import { errMsg, getPckg, validMsg } from './utils'

sup
  .version('0.0.1')
  .arguments('<script_name> <script>')
  .option(
  '-p, --path <p>',
  'Path to directory containing package.json',
  (p: string) => path.resolve(p, 'package.json')
  )
  .option(
  '-pr, --pre [pre]',
  'This command will run before every call to the main script'
  )
  .option(
  '-po, --post [post]',
  'This command will run after every call to the main script'
  )
  .action((cmdName: string, cmd: string) => {

    const { path: sPath, pre, post } = sup;

    getPckg(sPath)
      .then((v: string) => {
        const pckgFile = JSON.parse(v);

        const scriptArr = Object.keys(pckgFile.scripts)

        if (scriptArr.indexOf(cmdName) > 0) {
          errMsg(`
There is already a script named '${cmdName}'
in file '${sPath}'. If you wish to
edit the existing script, do some stuff I haven't
thought of yet.`);
        } else {
          pckgFile.scripts[cmdName] = cmd;


          fs.writeFile(sPath, `${JSON.stringify(pckgFile, null, 2)}`, {
            encoding: 'utf-8'
          },
            (e) => {
              if (e) {
                errMsg(e.message);
              } else {
                validMsg(`
Updated package.json at ${sPath} to
include script ${cmdName}.`
                );
              }
            })
        }
      })
      .catch((e: any) => errMsg(e, process));
  })
  .parse(process.argv);

