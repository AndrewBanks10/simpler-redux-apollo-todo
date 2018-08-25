const { getTodo, getTodos } = require('../../db')

module.exports.default = {
  async todo (_rootObj, { id }) {
    const ret = await getTodo(id)
    return ret
  },
  async todos () {
    const ret = await getTodos()
    return ret
  }
}
