module.exports = new Proxy({}, {
  get: function () {
    return function Placeholder() { return null }
  }
})
