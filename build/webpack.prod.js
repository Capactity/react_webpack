// 打包环境配置
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = merge(baseConfig, {
  mode: "production", // 生产模式，开启tree-shaking和代码压缩
  plugins: [
    new CopyPlugin({
      // 复制public静态文件
      patterns: [
        {
          from: path.resolve(__dirname, "../public"),
          to: path.resolve(__dirname, "../dist"),
          filter: (source) => {
            return !source.includes("index.html"); // 忽略index.html
          },
        },
      ],
    }),
  ],
});
