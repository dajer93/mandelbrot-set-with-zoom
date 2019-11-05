const merge = require('webpack-merge')
const LiveReloadPlugin = require('webpack-livereload-plugin')

let liveReloadOptions = {
  protocol: "http",
  port: 8089,
  hostname: "localhost",
}

module.exports = merge(require('./webpack.config.js'), {
  mode: "development",
  watch: true,
  plugins: [
    new LiveReloadPlugin(liveReloadOptions)
  ]
});