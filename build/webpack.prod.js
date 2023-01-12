// 打包环境配置
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
module.exports = merge(baseConfig, {
  mode: "production", // 生产模式，开启tree-shaking和代码压缩
});
