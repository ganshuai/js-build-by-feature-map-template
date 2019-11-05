var path = require('path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var VueLoaderPlugin = require('vue-loader/lib/plugin')
var isProd = process.env.NODE_ENV === 'production'
var plugins = [
  new webpack.EnvironmentPlugin({
    NODE_ENV: process.env.NODE_ENV || 'dev'
  }),
  new webpack.NamedChunksPlugin(),
  new webpack.NamedModulesPlugin(),
  new VueLoaderPlugin()
]

module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: 'source-map',
  entry: './src/index.js',
  watch: !isProd,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.vue']
  },
  plugins
}
