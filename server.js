var webpack = require("webpack");
var webpackDevServer = require("webpack-dev-server");
var opener = require('opener');
var config = require('./webpack.config');

var host = (process.env.HOST || '0.0.0.0')
var port = (+process.env.PORT) || 3000;

new webpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
  // It suppress error shown in console, so it has to be set to false.
  quiet: false,
  // It suppress everything except error, so it has to be set to false as well
  // to see success build.
  noInfo: false,
  stats: {
    // Config for minimal console.log mess.
    assets: true,
    colors: true,
    version: false,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: true
  }
}).listen(port, host, function(err, result) {
  if (err) {
    return console.log(err);
  }

  console.log("Listennig at http://" + host + ":" + port + "/");
  opener("http://" + host + ":" + port + "/home/");
})
