// Webpack config for development

var path =require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss =  require('precss');
var host = (process.env.HOST || 'localhost');
var port = (+process.env.PORT + 1) || 3001;

module.exports = {
  devtool: "eval",

  target: 'web',
  entry: {
    jQuery: ['jquery'],
    main: [
      "font-awesome-webpack",
      "bootstrap-loader",
      "react-hot-loader/patch",
      "webpack-dev-server/client?http://" + host + ":" + port,
      "webpack/hot/only-dev-server",
      "./src/index"
    ]
  },
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "http://" + host + ":" + port + '/',
    filename: "[name].js"
  },
  resolve: {
    extensions: ["", ".json",".js", ".jsx"],
    alias: {
      'jquery': path.join(__dirname, 'node_modules/jquery/dist/jquery')
    }
  },
  module: {
    preLoaders: [ { test: /\.jsx?$/, include: path.join(__dirname, 'src'), loader: "eslint-loader" } ],
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: "babel-loader" },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.(scss|sass)$/, loader: "style-loader!css-loader?modules&importLoaders=2&localIdentName=[name]___[local]___[hash:base64:5]!postcss-loader!sass-loader" },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
           // 'file?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
          'url-loader?limit=5120&name=assets/images/[name].[ext]',
          // 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      // Font Definitions
      { test: /\.woff(2)?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff&name=assets/fonts/[name].[ext]" },
      { test: /\.(ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/, loader: "file?name=assets/fonts/[name].[ext]" },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // <-- To generate hot update chuncks.
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ "process.env.NODE_ENV": JSON.stringify("development") }),
    new webpack.optimize.CommonsChunkPlugin("jQuery", "jQuery.js", Infinity),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
      'window.$': 'jquery'
    }),
    new HtmlWebpackPlugin({
      template: 'index.template.html',
      inject: 'body',
      filename: 'index.html'
    })
  ],
  postcss: function() {
    return [
      precss, 
      autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] })
    ];
  },
  // ESLint options
  eslint: {
    configFile: ".eslintrc",
    failOnWarning: false,
    failOnError: true
  }
}