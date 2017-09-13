Install: `npm install -g scriptup`

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
