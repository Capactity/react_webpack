// webpack 公共配置
const path = require("path");

module.exports = {
  entry: path.join(_dirname, "../src/index.tsx"), // 入口文件
  output: {
    // 出口文件
    filename: "static/js/[name].js", // 输出js的名称
    path: path.join(__dirname, "/dist"), // 打包输出路径
    clean: true, // 是否需要删除dist文件
    publicPath: "/", // 打包文件公共前缀路径
  },
};
