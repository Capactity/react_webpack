// webpack 公共配置
const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); //最终构建好的静态资源都引入到一个html文件中,才能在浏览器中运行
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 抽取css样式，开发模式中嵌入style标签中方便调试，打包css单独抽离文件
const isDev = process.env.NODE_ENV === "development"; // 是否为开发模式
module.exports = {
  entry: path.join(__dirname, "../src/index.tsx"), // 入口文件
  output: {
    // 出口文件
    filename: "static/js/[name].[chunkhash:8].js", // 输出js的名称，添加hash，合理分配缓存
    path: path.join(__dirname, "../dist"), // 打包输出路径
    clean: true, // 是否需要删除dist文件
    publicPath: "/", // 打包文件公共前缀路径
  },
  module: {
    rules: [
      {
        include: [path.resolve(__dirname, "../src")], // 仅针对src文件的ts,tsx进行loader解析
        test: /.(ts|tsx)$/, // 匹配ts,tsx文件
        use: ["thread-loader", "babel-loader"],
      },
      {
        include: [path.resolve(__dirname, "../src")],
        test: /.css$/, // 匹配css文件
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, //  开发环境使用style-loader 打包模式抽离css
          "css-loader",
          "postcss-loader",
        ],
      },
      {
        include: [path.resolve(__dirname, "../src")],
        test: /.less$/, // 匹配less文件
        use: [
          isDev ? "style-loader" : MiniCssExtractPlugin.loader, //  开发环境使用style-loader 打包模式抽离css
          "css-loader",
          "postcss-loader",
          "less-loader",
        ],
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64位
          },
        },
        generator: {
          filename: "static/images/[name][ext]", // 文件输出目录和命名
        },
      },
    ],
  },
  resolve: {
    // 配置解析后缀查找文件
    extensions: [".js", ".tsx", ".ts"],
    alias: {
      // 配置别名引用
      "@": path.join(__dirname, "../src"),
    },
    modules: [path.resolve(__dirname, "../node_modules")], // 查找第三方模块只在本项目的node_modules中查找，避免从全局模块获取，打包丢失。
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
  cache: {
    // 开启持久化存储缓存
    type: "filesystem", // 使用文件缓存，改善后续打包构建速度
  },
};
