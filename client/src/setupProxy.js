const proxy = require('http-proxy-middleware')
    
module.exports = function(app) {
  app.use(

    proxy('/socket.io', {
      target: 'http://localhost:3001/',
      ws: true
    }),

    proxy('/api', {
      target: 'http://localhost:3001/',
      headers: { Accept: 'application/json' }
    }),

    proxy('/admin', {
      target: 'http://localhost:3001/',
      headers: { Accept: 'application/json' }
    }),
    
  )
}