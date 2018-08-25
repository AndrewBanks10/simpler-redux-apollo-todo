import Adapter from 'enzyme-adapter-react-16'
import { configure, mount } from 'enzyme'
const { JSDOM } = require('jsdom')

export default node => {
  const jsdom = new JSDOM('<!doctype html><html><body></body></html>', {
    url: 'http://localhost'
  })

  const { window } = jsdom
  global.window = window
  global.document = window.document

  //
  // Put all of your window features that are missing from jsdom that you need here.
  //

  //
  // Testing for react 16.
  //
  global.requestAnimationFrame = function (callback) {
    setTimeout(callback, 0)
  }

  Object.keys(global.window).forEach(property => {
    if (typeof global[property] === 'undefined') {
      global[property] = global.window[property]
    }
  })

  global.navigator = {
    userAgent: 'node.js'
  }

  configure({ adapter: new Adapter() })

  // Mount the node
  return mount(node)
}
