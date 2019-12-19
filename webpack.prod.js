const webpackMerge = require("webpack-merge")
const commonConfig = require("./webpack.common")

const prdConfig = {
  mode: "production",
  optimization: {
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: "~",
      name: true,
    },
  },
}

module.exports = webpackMerge(commonConfig, prdConfig)
