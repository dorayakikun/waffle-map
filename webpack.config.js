const path = require('path')
const webpack = require('webpack')

const BASE_PLUGINS = [
  new webpack.DefinePlugin({
    'process.env.npm_package_wafflemap_meshcalculator': JSON.stringify(
      process.env.npm_package_wafflemap_meshcalculator
    ),
  }),
]

module.exports = {
  entry: './src/index.tsx',
  devServer: {
    contentBase: 'public/',
    historyApiFallback: true,
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
}
