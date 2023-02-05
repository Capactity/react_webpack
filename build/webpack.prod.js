// 打包环境配置
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // css压缩插件
const TerserPlugin = require("terser-webpack-plugin"); // 压缩js插件
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
    // 抽离css插件
    new MiniCssExtractPlugin({
      filename: "static/css/[name].[contenthash:8].css", // 抽离css的输出目录和名称
    }),
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        // 压缩 js文件
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ["console.log"], // 删除console.log
          },
        },
      }),
    ],
  },
});
