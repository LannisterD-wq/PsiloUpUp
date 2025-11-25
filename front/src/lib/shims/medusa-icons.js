module.exports = new Proxy({}, {
  get: function () {
    return function IconPlaceholder() { return null }
  }
})
