var path = require('path')

module.exports = {
  mode: 'production',
  entry: ['./index.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'axios-package.min.js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude:path.resolve(__dirname,'/node_modules'),
          include:path.resolve(__dirname,'/src'),
          options: {
              presets: ['env']
          }
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: 'source-map'
}

// if (process.env.NODE_ENV === 'production') {
//   module.exports.devtool = false
//   module.exports.plugins = (module.exports.plugins || []).concat([
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: '"production"'
//       }
//     }),
//     new webpack.optimize.UglifyJsPlugin({
//       sourceMap: false,
//       compress: {
//         warnings: false
//       }
//     }),
//     new webpack.LoaderOptionsPlugin({
//       minimize: true
//     })
//   ])
// }
