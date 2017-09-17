Install: `npm install -g scriptup`

Usage:

```bash
  Usage: sup <script_name> <cmd> [option] [cmd]


  Options:

    -V, --version        output the version number
    -p, --path <p>       Path to directory containing package.json
    
    -e, --pre [cmd]      
    As a flag: Append 'pre' to <script_name>.
    
    W/ option: Create additional script with 'pre' appended to <script_name>, using
               [precommand] as the script to run BEFORE every call to <script_name>
    
    -o, --post [cmd]     
    As a flag: Append 'post' to <script_name>.
    
    W/ option: Create additional script with 'post' appended to <script_name>, using
               [postcommand] as the script to run AFTER every call to <script_name>
    
    -r, --remove [cmds]  
    Remove a command from the package.json scripts with the command name provided.
    
    -h, --help           output usage information

IF YOU PASS ARGUMENTS IN AN UNEXPECTED ORDER, I WILL BREAK YOUR PACKAGE.JSON :)
```


Examples:

```javascript
/**
* Main command: scriptup|sup <script_name> [options] [cmds...]
*
* Examples: */

// Create a script 'start' which runs index.js w/ node
```

  `sup start 'node index.js'`

```javascript
// Create a set of NPM scripts

[
 'prebuild',
 'build',
 'postbuild'
]

//    to

[
 'remove the existing folder `./dist` if there is one',
 'run webpack using a config file at path `webpack.config.js`',
 'run the file at path `dist/index.js` w/ node'
]
```

  `sup build 'webpack --config webpack.config.js' -e 'rm -rf ./dist' -o 'node dist/index.js'`

```javascript
// Remove a script 'build'
```

  `sup -r build`
