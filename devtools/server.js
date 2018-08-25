/*
  Do not edit this file. It will be overwritten during updates.
*/

/* eslint no-console: 0 */
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')

let webpackConfig
if (process.env.NODE_ENV === 'development') {
  webpackConfig = require('./webpack.dev')
} else {
  webpackConfig = require('./webpack.prod')
}

const port = process.env.npm_package_config_port || 3000
const host = process.env.npm_package_config_host || 'localhost'

function setUpServer () {
  try {
    new WebpackDevServer(webpack(webpackConfig), webpackConfig.devServer
    ).listen(port, host, function (err) {
      if (err) {
        console.log(err)
      }
      console.log(`devtools/server.js listening at http://${host}:${port}.`)
    })
  } catch (ex) {
    if (ex.indexOf('EADDRINUSE') !== -1) {
      console.log(`This program is already running at http://${host}:${port}. Either exit the vscode that may be causing it or kill the node process associated with it.`)
    } else {
      console.log(`Server Error: ${ex}.`)
    }
    process.exit(-1)
  }
}

setUpServer()

/*
  This will start bsb in the background. Looks like the vscode extension does that already.
  Keep this around awhile to be sure.
const { runBsbWatchCommand } = require('./util')
const configCommon = require('./webpack.config.common')
if (!configCommon.supportReason) {
  setUpServer()
} else if (configCommon.manualBsb) {
  console.log('Manual bsb. Make sure you open a command window and perform a watcher (npm run bsb')
  setUpServer()
} else {
  runBsbWatchCommand(setUpServer)
}

*/

process.on('uncaughtException', function (err) {
  if (err.code.indexOf('EADDRINUSE') !== -1) {
    console.log(`This program is already running at http://${host}:${port}. Either exit the vscode that may be causing it or kill the node process associated with it.`)
    console.log('Server exiting.')
    process.exit(-1)
  } else {
    console.log(`Server Error: ${err}.`)
  }
})