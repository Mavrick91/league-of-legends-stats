const proxy = require('http-proxy-middleware')

module.exports = function setupProxy(app) {
  app.use(
    proxy('/lol', {
      changeOrigin: true,
      target: 'https://euw1.api.riotgames.com/',
    }),
  )
}
