import ch = require('chalk')


export const msgOpts = {
  CMD_EXISTS: (cmdName: string) => `
This script already exists under the command name:

  '${ch.underline.magenta(cmdName)}'

If you want to overwrite the existing script, pass
the --force flag as an option.`,

  SCRIPT_EXISTS: (a: string, b: string) => `
There is already a script named '${a}' in file:

  ${b}

If you want to overwrite the existing script, pass
the --force flag as an option.`,
  SUCCESS: (path: string, cmdName: string) => `
Updated package.json at ${ch.cyan(path)} to include script '${cmdName}.'`
}

export const cmdOpts = {
  force: `
The default behavior of this tool is to error out if <script_name> or <cmd> already
exists in the package.json file. By enabling the --force flag, any existing scripts with
<script_name> will be over-written, and duplicate commands w/ different aliases will be allowed.
`,
  path: `Path to directory containing package.json
`,
  post: `
${ch.cyan('As a flag')}: Append 'post' to <script_name>.

${ch.blue('W/ option')}: Create additional script with 'post' appended to <script_name>, using
           [postcommand] as the script to run AFTER every call to <script_name>
`,
  pre: `
${ch.cyan('As a flag')}: Append 'pre' to <script_name>.

${ch.blue('W/ option')}: Create additional script with 'pre' appended to <script_name>, using
           [precommand] as the script to run BEFORE every call to <script_name>
`
}
