// 打包环境配置，默认支持tree shaking 清理未引用的js
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const CopyPlugin = require("copy-webpack-plugin");
const globAll = require("glob-all");
const glob = require("glob");
const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin"); // css压缩插件
const TerserPlugin = require("terser-webpack-plugin"); // 压缩js插件
const { PurgeCSSPlugin } = require("purgecss-webpack-plugin");
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
    // 清理无用css
    new PurgeCSSPlugin({
      // 检测src下所有tsx文件和public下index.html中使用的类名和id及标签名称
      // 只打包这些文件中用到的样式
      paths: globAll.sync([
        `${path.join(__dirname, "../src")}/**/*.tsx`,
        path.join(__dirname, "../public/index.html"),
      ]),
      safelist: {
        // 配置白名单, 不过滤antd组件库相关class前缀ant
        standard: [/^ant-/],
      },
    }),
    // 打包生成gzip文件
    new CompressionPlugin({
      test: /.(js|css)$/, // 只生成css, js压缩文件
      filename: "[path][base].gz", // 文件命名
      algorithm: "gzip", // 压缩格式，默认gzip
      threshold: 10240, // 当大小大于该值的文件才会被处理， 默认10k
      minRatio: 0.8, // 压缩率，默认0.8
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
    // 分割代码
    splitChunks: {
      cacheGroups: {
        vendors: {
          test: /node_modules/, // 提取node_modules代码
          name: "vendors", // 提取文件命名为vendors, js后缀和chunkhash自动添加
          minChunks: 1, // 是要使用过一次的则提取出来
          chunks: "initial", // 只提取初始化能获取到的模块
          minSize: 0, // 提取代码体积大于0的
          priority: 1, // 优先级为1
        },
      },
      // 提取页面公共代码
      // commons: {
      //   name: "commons", // 提取文件命名为commons
      //   minChunks: 2,
      //   chunks: "initial",
      //   minSize: 0,
      // },
    },
  },
});
