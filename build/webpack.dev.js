// 开发环境配置
const path = require("path");
const { merge } = require("webpack-merge");
const baseConfig = require("./webpack.base");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = merge(baseConfig, {
  mode: "development", // 开发模式，加速打包
  devtool: "eval-cheap-module-source-map", // 源码调试模式, cheap--定位到行，module--定位到源代码的错误
  devServer: {
    port: 3000,
    compress: false, // 开发环境关闭gzip压缩，提升热更新速度
    hot: true, // 开启热更新
    historyApiFallback: true, // 处理history模式路由404问题
    static: {
      directory: path.join(__dirname, "../public"), // 静态资源托管public文件夹
    },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ],
});
