import ch = require('chalk')

const msgOpts = {
  ADD_SUCCESS: (path: string, cmdName: string[]) => `
Updated package.json at ${ch.cyan(path)} to include script/s:

 '${cmdName.toString().replace(/,/, `', '`)}'`,
  CMD_EXISTS: (cmdName: string) => `
This script already exists under the command name:

  '${ch.underline.magenta(cmdName)}'

If you want to overwrite the existing script, pass
the --force flag as an option.`,
  DEL_ERR: (path: string, cmdName: string, scrArr: string[]) => `
Could not find '${cmdName}' in ${ch.cyan(path)}. Here are the scripts I found:

  ${ch.inverse.cyan(...scrArr)}
`,
  DEL_SUCCESS: (path: string, cmdName: string[]) => `
Updated package.json at ${ch.cyan(path)} and removed script/s:

 '${cmdName.toString().replace(/,/, `', '`)}'`,

  PRE_POST: (cmdName: string) => `
Cannot provide both ${ch.inverse.blue('pre')} and ${ch.inverse.magenta('post')}
flags as boolean options. Did you _REALLY_ want
'${cmdName}' and '${cmdName.replace('pre', 'post')}' scripts with the same command?

` + "Because we don't do that here sry ¯\\_(ツ)_/¯ \n",

  SCRIPT_EXISTS: (cmdName: string, exists: string) => `
There is already a script named '${cmdName}' in file:

  ${exists}

If you want to overwrite the existing script, pass
the --force flag as an option.`
}

const cmdOpts = {
  FORCE: `
The default behavior of this tool is to error out if <script_name> or <cmd> already
exists in the package.json file. By enabling the --force flag, any existing scripts with
<script_name> will be over-written, and duplicate commands w/ different aliases will be allowed.
`,
  PATH: `Path to directory containing package.json
`,
  POST: `
${ch.cyan('As a flag')}: Append 'post' to <script_name>.

${ch.blue('W/ option')}: Create additional script with 'post' appended to <script_name>, using
           [postcommand] as the script to run AFTER every call to <script_name>
`,
  PRE: `
${ch.cyan('As a flag')}: Append 'pre' to <script_name>.

${ch.blue('W/ option')}: Create additional script with 'pre' appended to <script_name>, using
           [precommand] as the script to run BEFORE every call to <script_name>
`,
  REMOVE: `
Remove a command from the package.json scripts with the command name provided.
`
}


export { cmdOpts, msgOpts }
