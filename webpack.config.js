const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: "./src/index.tsx",
  devServer: {
    contentBase: "public/",
    historyApiFallback: true
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "public"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif|ico|jpeg)$/i,
        use: [
          {
            loader: "url-loader"
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader"
      },
      {
        test: /\.otf(\?.*)?$/,
        use:
          "file-loader?name=/fonts/[name].  [ext]&mimetype=application/font-otf"
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      LOGIC_TYPE: JSON.stringify(
        process.env.npm_package_wafflemap_meshcalculator
      )
    })
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".css"]
  }
};
