#!/usr/bin/env node --harmony
import * as ch from 'chalk';
import * as sup from 'commander';
import * as fs from 'fs';
import * as path from 'path';

import { errMsg, getPkg, makeJSON, validMsg, wrCb } from './utils';

import { cmdOpts, msgOpts } from './utils/constants';

// tslint:disable
/**
 * Main command: sup <script_name> [options] [cmds...]
 *
 * Examples:
 *
 * Create a set of NPM scripts [
 *  'prebuild',
 *  'build',
 *  'postbuild'
 * ]
 *    to
 * [
 *  'remove the existing folder `./dist` if there is one',
 *  'run webpack using a config file at path `webpack.config.js`',
 *  'run the file at path `dist/index.js` w/ node'
 * ]:
 *      sup build 'webpack --config webpack.config.js' -e 'rm -rf ./dist' -o 'node dist/index.js'
 *
 * HOW NICE IS THAT. C'mon. It's nice. _C'mon._
 *
*/
// tslint:enable
// tslint:disable-next-line:class-name
interface scriptObj {
  cmd: string;
  cmdName: string;
}

const scriptsToDelete: string[] = [];

let scriptObjs: scriptObj[] = [];

const addPre = (val, ...rest) => console.log(val, rest);
sup
  .version('0.0.1')
  .usage('<script_name> <cmd> [option] [cmd]')
  .arguments('<script_name> [cmd]')
  .option(
    '-p, --path <p>',
    cmdOpts.PATH,
    p => path.resolve(p, 'package.json'),
    path.resolve('package.json')
  )
  .option('-e, --pre [cmd]', cmdOpts.PRE)
  .action(
    cmd =>
      sup.pre &&
      scriptObjs.push({
        cmd: sup.args[0] ? sup.pre : cmd,
        cmdName: `pre${sup.args[0] || sup.pre}`
      })
  )
  .option('-o, --post [cmd]', cmdOpts.POST)
  .action(
    cmd =>
      sup.post &&
      scriptObjs.push({
        cmd: sup.args[0] ? sup.post : cmd,
        cmdName: `post${sup.args[0] || sup.post}`
      })
  )
  .option('-r, --remove [cmds]', cmdOpts.REMOVE, cmd =>
    getPkg(sup.path).then(v => {
      let pckgFile = JSON.parse(v);
      const { scripts } = pckgFile;

      try {
        delete scripts[cmd];
      } catch (e) {
        return errMsg(e);
      }

      pckgFile = makeJSON({ ...pckgFile, scripts });

      fs.writeFile(sup.path, pckgFile, { encoding: 'utf-8' }, e =>
        wrCb(e, sup.path.toString(), cmd, true)
      );
    })
  )
  .action((cmdName, cmd) => {
    scriptObjs =
      (cmd && cmdName && [...scriptObjs, { cmd, cmdName }]) || scriptObjs;

    getPkg(sup.path).then(v => {
      let pckgFile = JSON.parse(v);
      let { scripts } = pckgFile;

      scriptObjs.forEach(({ cmd, cmdName }) => {
        scripts = { ...scripts, [cmdName]: cmd };
      });
      pckgFile = makeJSON({ ...pckgFile, scripts });
      fs.writeFile(sup.path, pckgFile, { encoding: 'utf-8' }, e =>
        wrCb(e, sup.path.toString(), scriptObjs.map(scr => scr.cmdName))
      );
    });
  })
  .on('--help', () =>
    console.log(
      ch.bgRed(
        ch.bold(
          '\n' +
            `IF YOU PASS ARGUMENTS IN AN UNEXPECTED ORDER, I WILL BREAK YOUR PACKAGE.JSON :)`
        )
      )
    )
  )
  .parse(process.argv);
