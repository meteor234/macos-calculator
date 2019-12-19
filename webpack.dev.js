const path = require("path")

const webpackMerge = require("webpack-merge")
const commonConfig = require("./webpack.common")

const devConfig = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    open: true,
    hot: true,
  },
}

module.exports = webpackMerge(commonConfig, devConfig)
