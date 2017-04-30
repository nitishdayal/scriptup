#!/usr/bin/env node --harmony
import sup = require('commander');
import path = require('path');
import fs = require('fs');
import ch = require('chalk');

import {
  errMsg,
  getPckg,
  makeJSON,
  validMsg,
  wrCb
} from './utils'

import { cmdOpts, msgOpts } from './utils/constants'


sup.version('0.0.1')
  .usage('<script_name> [cmd...] [options]')
  .arguments('<script_name> [cmd]')
  .option('-o, --post [post]', cmdOpts.POST)
  .option('-e, --pre [pre]', cmdOpts.PRE)
  .option(
  '-p, --path <p>', cmdOpts.PATH,
  (p) => path.resolve(p, 'package.json'),
  path.resolve('package.json')
  )
  .option('-r --remove', cmdOpts.REMOVE)
  .option('-f, --force', cmdOpts.FORCE)
  .action((cmdName: string, cmd: string) => {

    const { path: sPath, pre, post, force, remove } = sup;
    let nScripts = [{ cmdName, cmd }];

    getPckg(sPath)
      .then((v: string) => {

        const pckgFile = JSON.parse(v);
        const scripts = Object.values(pckgFile.scripts)
        const scriptArr = Object.keys(pckgFile.scripts)

        if (remove) {

          const err: string[] = []
          const delArgs = sup.args[2].rawArgs.splice(3);

          delArgs.forEach((arg) => {
            if (scriptArr.indexOf(arg) < 0) {
              err.push(msgOpts.DEL_ERR(sPath, arg, scriptArr))
            }
          })

          if (err.length > 0) {
            err.forEach((e) => errMsg(e));
            return process.exitCode = 1;
          }

          delArgs.forEach((cmd) => {
            try {
              delete pckgFile.scripts[cmd]
            } catch (e) {
              return errMsg(e)
            }
          })

          return fs.writeFile(
            sPath,
            makeJSON(pckgFile),
            { encoding: 'utf-8' },
            (e) => wrCb(e, sPath.toString(), delArgs, remove)
          )
        }

        if (pre) {

          const preCmd = `pre${cmdName}`

          if (pre === true) {

            if (!post) {
              nScripts[0].cmdName = preCmd;
            } else {
              return errMsg(msgOpts.PRE_POST(preCmd));
            }
          } else {

            nScripts.push({
              cmd: pre,
              cmdName: preCmd
            });

          }
        }

        if (post) {
          const pstCmd = `post${cmdName}`
          if (post === true) {
            nScripts[0].cmdName = pstCmd;
          } else {
            nScripts.push({
              cmd: post,
              cmdName: pstCmd
            })
          }
        }

        if (!force === true) {

          if (scriptArr.indexOf(cmdName) > 0) {
            return errMsg(msgOpts.SCRIPT_EXISTS(cmdName, sPath));
          } else if (scripts.indexOf(cmd) > 0) {
            return errMsg(msgOpts.CMD_EXISTS(scriptArr[scripts.indexOf(cmd)]))
          }
        }

        nScripts = nScripts.length < 2 ? nScripts : nScripts.slice(1)

        nScripts.forEach(({ cmd, cmdName }) => {
          pckgFile.scripts[cmdName] = cmd
        })

        console.log(nScripts);

        fs.writeFile(
          sPath,
          makeJSON(pckgFile),
          { encoding: 'utf-8' },
          (e) => wrCb(e, sPath.toString(), nScripts.map((scr) => scr.cmdName))
        )

      })
      .catch((e: any) => errMsg(e));
  })
  .parse(process.argv);
