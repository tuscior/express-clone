const Layer = require('./layer')
const Route = require('./route')

const Router = function() {
    this.stack = [
        new Layer('*', function(req, res) {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('404')
        })
    ]
}

Router.prototype.handle = function(req, res) {
    let self = this,
      method = req.method;
  
    for (let i = 0; i < self.stack.length; i++) {
      if (
        self.stack[i].path.match(req.url) &&
        self.stack[i].route &&
        self.stack[i].route._handle_method(method)
      ) {
        return self.stack[i].handle_request(req, res);
      }
    }
  
    return self.stack[0].handle_request(req, res);
  };
  
  Router.prototype.route = function route(path) {
    const route = new Route(path);
    const layer = new Layer(path, function(req, res) {
      route.dispatch(req, res);
    });
  
    layer.route = route;
  
    this.stack.push(layer);
  
    return route;
  };
  
Router.prototype.get = function(path, fn) {
    const route = this.route(path)
    route.get(fn)
    return this
    // this.stack.push(new Layer(path, fn))
}
Router.prototype.put = function(path, fn) {
    const route = this.route(path);
    route.put(fn);
    return this;
}

module.exports = Router