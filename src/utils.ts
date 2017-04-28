import ch = require('chalk');
import fs = require('fs');
import path = require('path');

const errMsg =
  (msg: string, { exit } = process) =>
    console.error(fmt(['ERORR:', `${msg}`], true)) && exit(1)

const fmt = ([title, ...msg]: string[], err = false) => {
  switch (err) {
    case true:
      return ch.inverse((ch.bold.red(title) + ch.white(...msg)))
    default:
      return (ch.bold.bgBlue.white(title) + ch.inverse.green(...msg))
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
