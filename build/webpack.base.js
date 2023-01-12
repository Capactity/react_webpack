// webpack 公共配置
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //最终构建好的静态资源都引入到一个html文件中,才能在浏览器中运行

module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  output: {
    // 出口文件
    filename: "static/js/[name].js", // 输出js的名称
    path: path.join(__dirname, "/dist"), // 打包输出路径
    clean: true, // 是否需要删除dist文件
    publicPath: "/", // 打包文件公共前缀路径
  },
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 匹配ts,tsx文件
        use: {
          loader: "babel-loader",
          options: {
            // 预设执行顺序由右往左
            presets: ["@babel/preset-react", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    // 配置解析后缀查找文件
    extensions: [".js", ".tsx", ".ts"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"), // 模版取定义root节点的模版
      inject: true, // 自动注入静态资源
    }),
    new webpack.DefinePlugin({
      // 设置环境变量
      "process.env.BASE_ENV": JSON.stringify(process.env.BASE_NEW),
    }),
  ],
};
