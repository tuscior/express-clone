const Layer = require('./layer')

const Route = function(path) {
  this.path = path
  this.stack = []
  this.methods = {}
}

Route.prototype._handle_method = function(method) {
  const name = method.toLowerCase()
  return Boolean(this.methods[name])
}

Route.prototype.get = function(fn) {
  let layer = new Layer('/', fn)
  layer.method = 'get'
  this.methods['get'] = true
  this.stack.push(layer)
  return this
}

Route.prototype.put = function(fn) {
  let layer = new Layer('/', fn)
  layer.method = 'put'

  this.methods['put'] = true
  this.stack.push(layer)
  return this
}

Route.prototype.dispatch = function(req, res) { 
  let self = this,
      method = req.method.toLowerCase()

  for(let i = 0; i < self.stack.length; i++){
      if(method === self.stack[i].method) {
          return self.stack[i].handle_request(req, res)
      }
  }
}

module.exports = Route;