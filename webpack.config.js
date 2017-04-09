var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var autoprefixer = require('autoprefixer')
var path = require('path')

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: path.resolve(__dirname, 'react', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'react', 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [{
      test: /\.json$/,
      use: 'json-loader'
    }, {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }, {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [{loader: 'style-loader'}, {loader: 'css-loader'}, {loader: 'postcss-loader'}]
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      exclude: /node_modules/,
      use: ['file-loader?hash=sha512&digest=hex&name=img/[hash].[ext]',
        'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
      ]
    }]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'react', 'index.html')
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [
          autoprefixer
        ]
      }
    })
  ],

  devServer: {
    historyApiFallback: true,
    inline: true
  }
}
