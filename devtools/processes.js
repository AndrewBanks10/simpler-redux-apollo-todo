/* eslint no-console: 0 */
/* eslint standard/no-callback-literal: 0 */

const childProcess = require('child_process')
const path = require('path')
const projectConfig = require('./projectconfig.js')

const __cwd = process.cwd()

function fixCommand (command) {
  if (process.platform.indexOf('win32') !== -1) {
    command = `${command}.cmd`
  }
  return command
}

function runScript (scriptPath, args, options) {
  return new Promise(function (resolve, reject) {
    let invoked = false
    const process = childProcess.fork(scriptPath, args, options)

    process.on('error', function (err) {
      if (invoked) return
      invoked = true
      console.info(`runScript failed ${err}, scriptPath=${scriptPath}`)
      reject(err)
    })

    if (process.stdout) {
      process.stdout.on('data', data => {
        console.log(data.toString())
      })
    }

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
      if (invoked) return
      invoked = true
      const err = code === 0 ? null : new Error(`exit code ${code}`)
      if (err === null) {
        resolve()
      } else {
        console.info(`runScript exit failed ${err}, scriptPath=${scriptPath}`)
        reject(err)
      }
    })
  })
}

function runCommandSync (command, args, options) {
  const ret = childProcess.spawnSync(fixCommand(command), args, options)
  if (ret.error) {
    return false
  }
  return true
}

function npmInstallPackages (args, options) {
  try {
    let npm = fixCommand('npm')
    if (!Array.isArray(args)) {
      args = [args]
    }
    args.unshift('install')
    const ret = childProcess.spawnSync(npm, args, options)
    if (ret.error) {
      return false
    }
    return true
  } catch (err) {
    console.log('npmInstallPackages failed.')
    console.info(err)
    return false
  }
}

function npmRunCommand (args, callback = undefined, options = {}) {
  let err = false
  let npm = fixCommand('npm')
  if (!Array.isArray(args)) {
    args = [args]
  }
  if (options.silent) {
    args.unshift('-s')
  }
  args.unshift('run')
  const cprocess = childProcess.spawn(npm, args)

  cprocess.on('error', function () {
    callback(false)
  })

  cprocess.stdout.on('data', data => {
    if (typeof options.errorStrings !== 'undefined') {
      options.errorStrings.forEach(e => {
        if (data.indexOf(e) !== -1) {
          err = true
        }
      })
    }
    if (options.traceProcessOutput) {
      console.log('npmRunCommand stdout: ' + data.toString())
    }
  })

  cprocess.stderr.on('data', data => {
    if (typeof options.errorStrings !== 'undefined') {
      options.errorStrings.forEach(e => {
        if (data.indexOf(e) !== -1) {
          err = true
        }
      })
    }
    if (options.traceProcessOutput) {
      console.log('npmRunCommand stderr: ' + data.toString())
    }
  })

  // execute the callback once the process has finished running
  cprocess.on('exit', function (code) {
    if (typeof options.errorStrings !== 'undefined') {
      if (!err) {
        callback(true)
      } else {
        callback(false)
      }
    } else {
      callback(true)
    }
  })
}

function runCommand (command, args, options) {
  return new Promise(function (resolve, reject) {
    let invoked = false
    const process = childProcess.spawn(fixCommand(command), args, options)

    process.on('error', function (err) {
      if (invoked) return
      invoked = true
      reject(err)
    })

    // execute the callback once the process has finished running
    process.on('exit', function (code) {
      if (invoked) return
      invoked = true
      const err = code === 0 ? null : new Error(`exit code ${code}`)
      if (err === null) {
        resolve()
      } else {
        reject(err)
      }
    })
  })
}

function execFileSync (command, args, options) {
  childProcess.execFileSync(fixCommand(command), args, options)
}

function runWebpack (args, options) {
  if (process.env.TESTING) {
    options = {silent: true}
  }
  return runScript(
    path.join(__cwd, projectConfig.webpackPath),
    args,
    options
  )
}

function npmRunCommandSync (args) {
  if (!Array.isArray(args)) {
    args = [args]
  }
  args.shift('run')
  return runCommandSync('npm', args)
}

module.exports = {
  npmInstallPackages,
  runScript,
  runCommand,
  runCommandSync,
  npmRunCommand,
  npmRunCommandSync,
  execFileSync,
  runWebpack
}
