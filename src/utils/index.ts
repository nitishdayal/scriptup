import ch = require('chalk');
import fs = require('fs');
import path = require('path');

import { cmdOpts, msgOpts } from './constants'


const makeJSON = (p: JSON) => JSON.stringify(p, null, 2);

const validMsg = (msg: string) => console.info(fmtStr(['Success!', `${msg}`]));

const errMsg = (msg: string) => console.error(fmtStr(['ERROR:', ` `, `${msg}`], true));

const fmtStr = ([title, ...msg]: string[], err = false) =>
  err ? ch.bold.bgRed(title) + ch.red(...msg) : (ch.bold.bgBlue.white(title) + ch.green(...msg));

const getPckg = async (p: string) => await fs.readFileSync(path.resolve(p), 'utf-8')

const writeFileCB = ((e: Error, sPath: string, cmdName: string[], del?: boolean) => {
  if (e) {
    errMsg(e.message);
    process.exitCode = 1
  } else {
    process.exitCode = 0;
    return del ? validMsg(msgOpts.DEL_SUCCESS(sPath, cmdName)) :
      validMsg(msgOpts.ADD_SUCCESS(sPath, cmdName));
  }
})

export {
  errMsg,
  getPckg,
  makeJSON,
  validMsg,
  writeFileCB as wrCb
}
