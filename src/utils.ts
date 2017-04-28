import ch = require('chalk');
import fs = require('fs');
import path = require('path');

const errMsg =
  (msg: string) =>
    console.error(fmt(['ERROR:', `${msg}`], true)) && process.exit(0)

const fmt = ([title, ...msg]: string[], err = false) => {
  switch (err) {
    case true:
      return ch.bold.bgRed(title) + ch.red(...msg)
    default:
      return (ch.bold.bgBlue.white(title) + ch.green(...msg))
  }
}
const validMsg = (msg: string) => console.info(fmt(['Success!', `${msg}`]))

async function getPckg(p: string) {
  const pckgJson = await fs.readFileSync(path.resolve(p), 'utf-8')
  return pckgJson
}

export {
  errMsg,
  getPckg,
  validMsg
}
