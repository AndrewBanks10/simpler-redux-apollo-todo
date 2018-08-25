const fs = require('fs')
const path = require('path')
const {runWebpack} = require('./processes')

const nodeModulesFile = 'node_modules.json'
const appModulesFile = 'app_modules.json'
const webpackModuleList = 'webpack-config.modulelist.js'
const rawModulelist = 'modulelist.txt'
const tmpDir = 'tmp'
const devtoolsDir = path.join(process.cwd(), 'devtools')
const modulelistPath = path.join(devtoolsDir, tmpDir, rawModulelist)
const nodeModulesFilePath = path.join(devtoolsDir, 'node_modules.json')
const arg = process.argv[2] === undefined ? '' : process.argv[2].toLowerCase()
const allArg = 'all'
let currentNodeModules

if (fs.existsSync(nodeModulesFilePath)) {
  currentNodeModules = require('./node_modules.json')
}

function readFile (filepath) {
  if (!fs.existsSync(filepath)) {
    return null
  }
  return fs.readFileSync(filepath, 'utf8')
}

function readJSON (path) {
  return JSON.parse(readFile(path))
}

function writeFile (path, strFile) {
  fs.writeFileSync(path, strFile)
}

function writeJSON (path, json) {
  writeFile(path, JSON.stringify(json, null, 2))
}

function unlink (path) {
  try {
    fs.unlinkSync(modulelistPath)
  } catch (_ex) {
  }
}

function loadModulelist () {
  const strModulelist = readFile(modulelistPath)
  let modulelist = []
  let currmodule = ''
  const len = strModulelist.length
  for (let i = 0; i < len; ++i) {
    if (strModulelist[i] === '\r') {
      modulelist.push(currmodule)
      currmodule = ''
      ++i
    } else {
      currmodule += strModulelist[i]
    }
  }
  return modulelist
}

//
// The below will build both the node modules list and app module list.
// However, it may only build the app module list based on parameters.
//
function buildDllModulesLists () {
  let modulelist = loadModulelist()
  const nodeModules = modulelist.filter(e =>
    e.indexOf('node_modules') !== -1
  )
  const appModules = modulelist.filter(e =>
    e.indexOf('node_modules') === -1
  )

  // Build app dll and node_modules dll
  if (arg === allArg || currentNodeModules === undefined) {
    writeJSON(nodeModulesFilePath, nodeModules)
    writeJSON(path.join(devtoolsDir, appModulesFile), appModules)
  // Build only the app dll
  // If new node module(s) are included, package those with the app modules.
  } else {
    const nm = readJSON(nodeModulesFilePath)
    if (!nm) {
      throw new Error(`The file ${nodeModulesFile} does not exist. Run with the all parameter.`)
    }
    let currentNodeModules = new Set(nm)
    for (let i = 0; i < nodeModules.length; ++i) {
      if (!currentNodeModules.has(nodeModules[i])) {
        appModules.push(nodeModules[i])
      }
    }
    writeJSON(path.join(devtoolsDir, appModulesFile), appModules)
  }
}

//
// Builds the total module list of the project.
//
function buildModulesList () {
  unlink(modulelistPath)
  return runWebpack(
    [
      '--colors',
      '--config',
      path.join(__dirname, webpackModuleList)
    ],
    {}
  )
}

function buildDll (dllName) {
  return runWebpack(
    [
      '--colors',
      '--config',
      path.join(__dirname, dllName)
    ],
    {}
  )
}

async function buildDlls () {
  try {
    await buildModulesList()
    buildDllModulesLists()
    await buildDll('webpack.config.dlllib.app')
    if (arg === allArg) {
      await buildDll('webpack.config.dlllib.node')
    }
    console.log('buildDlls complete.')
  } catch (_ex) {
    console.log(`Error: ${_ex}`)
  }
}

buildDlls()
