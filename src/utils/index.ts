import ch = require('chalk');
import fs = require('fs');
import path = require('path');

import { msgOpts } from './constants'

const stringify = (p: JSON) => JSON.stringify(p, null, 2)

const errMsg =
  (msg: string) =>
    console.error(fmtStr(['ERROR:', `${msg}`], true));

const fmtStr = ([title, ...msg]: string[], err = false) => {
  switch (err) {
    case true:
      return ch.bold.bgRed(title) + ch.red(...msg)
    default:
      return (ch.bold.bgBlue.white(title) + ch.green(...msg))
  }
}
const validMsg = (msg: string) => console.info(fmtStr(['Success!', `${msg}`]))

const getPckg = async (p: string) => {
  const pckgJson = await fs.readFileSync(path.resolve(p), 'utf-8')
  return pckgJson
}

const writeFileCB = ((e: Error, sPath: string, cmdName: string) => {
  if (e) {
    errMsg(e.message);
    process.exitCode = 1
  } else {
    validMsg(msgOpts.SUCCESS(sPath, cmdName));
  }
})

export {
  errMsg,
  getPckg,
  msgOpts,
  stringify,
  validMsg,
  writeFileCB as wrCb
}

export { cmdOpts } from './constants'
