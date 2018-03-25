const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const BASE_PLUGINS = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    'process.env.npm_package_wafflemap_meshcalculator':  JSON.stringify(process.env.npm_package_wafflemap_meshcalculator),
  }),
]

console.log('env >', process.env.NODE_ENV)
module.exports = {
  entry:
    process.env.NODE_ENV === 'production'
      ? ['./src/index.tsx']
      : [
          'webpack-dev-server/client?http://localhost:9000',
          'webpack/hot/only-dev-server',
          './src/index.tsx',
        ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true,
    port: 9000,
    hot: true,
  },
  plugins:
    process.env.NODE_ENV === 'production'
      ? BASE_PLUGINS.concat([
          new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
              ecma: 8,
              compress: {
                warnings: false,
              },
            },
          }),
        ])
      : BASE_PLUGINS.concat([
          new webpack.NamedModulesPlugin(),
          new webpack.NoEmitOnErrorsPlugin(),
          new webpack.HotModuleReplacementPlugin(),
        ]),
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        use: 'json-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".js",".ts", ".tsx"]
  }
}
