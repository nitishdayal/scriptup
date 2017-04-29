#!/usr/bin/env node --harmony
import sup = require('commander');
import path = require('path');
import fs = require('fs');
import ch = require('chalk');
import {
  cmdOpts,
  errMsg,
  getPckg,
  msgOpts,
  stringify,
  validMsg,
  wrCb
} from './utils'

sup.version('0.0.1')
  .usage('<script_name> <cmd> [options]')
  .arguments('<script_name> <cmd>')
  .option(
  '-p, --path <p>', cmdOpts.path,
  (p) => path.resolve(p, 'package.json'),
  path.resolve('package.json')
  )
  .option('-pr --pre [pre]', cmdOpts.pre)
  .option('-po --post [post]', cmdOpts.post)
  .option('-f --force', cmdOpts.force)
  .action((cmdName: string, cmd: string) => {

    const { path: sPath, pre, post, force } = sup;

    getPckg(sPath)
      .then((v: string) => {
        const pckgFile = JSON.parse(v)

        if (!force === true) {
          const scripts = Object.values(pckgFile.scripts)
          const scriptArr = Object.keys(pckgFile.scripts)

          if (scriptArr.indexOf(cmdName) > 0) {
            errMsg(msgOpts.SCRIPT_EXISTS(cmdName, sPath));
          } else if (scripts.indexOf(cmd) > 0) {
            errMsg(msgOpts.CMD_EXISTS(scriptArr[scripts.indexOf(cmd)]))
          } else {
            pckgFile.scripts[cmdName] = cmd

            fs.writeFile(
              sPath,
              stringify(pckgFile),
              { encoding: 'utf-8' },
              (e) => wrCb(e, sPath.toString(), cmdName))
          }
        } else {
          pckgFile.scripts[cmdName] = cmd

          fs.writeFile(
            sPath,
            stringify(pckgFile),
            { encoding: 'utf-8' },
            (e) => wrCb(e, sPath.toString(), cmdName))
        }
      })
      .catch((e: any) => errMsg(e));
  })
  .parse(process.argv);
