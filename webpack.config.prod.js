// Webpack config for creating the production bundle.

var webpack = require('webpack');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
// var CompressionPlugin = require('compression-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer');
var precss =  require('precss');

module.exports = {
  target: 'web',
  entry: [ "./src/index.jsx" ],
  output: {
    path      : path.join(__dirname, 'dist'),
    publicPath: '/', // Simulate CDN
    filename  : 'bundle.[chunkhash:8].js'
  },
  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /(node_modules|bower_components)/, loader: 'babel-loader' },
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.(scss|sass)$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=2&sourceMap!postcss-loader!sass-loader?outputStyle=expanded&sourceMap=true&sourceMapContents=true') },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
            // 'file?hash=sha512&digest=hex&name=assets/images/[hash].[ext]',
            'url-loader?limit=100&name=images/[name].[ext]',
            // 'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      // Font Definitions
      { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },

    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], { verbose: true, dry: false, exclude: ["images"] }),
    
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('css/[name].[contenthash:5].css', { disable: false, allChunks: true }), //Extract to styles.css file
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify(process.env.NODE_ENV || "production"),
        "API_ADDRESS": JSON.stringify(process.env.API_ADDRESS)
      }
    }),

    new HtmlWebpackPlugin({
      template: 'index.template.prod.html',
      inject  : 'body',
      favicon:'./src/images/favico.ico',
      filename: 'index.html'
    }),

    // optimizations
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mangle  : true,
      compress: {
        sequences   : true,
        dead_code   : true,
        conditionals: true,
        booleans    : true,
        unused      : true,
        if_return   : true,
        join_vars   : true,
        drop_console: true,
        warnings: false
      },
      output: {
        comments: false
      }
    }),

    // Open GZip
    // new CompressionPlugin({
    //   asset: '[file].gz[query]',
    //   algorithm: 'gzip',
    //   regExp: /\.js$|\.html$|\.css$/,
    //   threshold: 1024,
    //   minRatio: 0.9
    // })
  ],
  resolve: {
    alias: {
      $: 'jquery',
      jQuery: 'jquery',
      "window.$": 'jquery',
      "window.jQuery": 'jquery',
    },
    extensions: ['', '.json', '.js', '.jsx']
  },
  postcss: function() {
    return [
      precss, 
      autoprefixer({ browsers: ['last 2 versions', 'ie >= 9', 'and_chr >= 2.3'] })
    ];
  }
}