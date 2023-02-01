// 耗时分析
const prodConfig = require("./webpack.prod.js"); // 打包配置
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); // 打包速度分析插件
const smp = new SpeedMeasurePlugin(); // 实例化
const { merge } = require("webpack-merge"); // 合并配置方法
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer"); // 分析打包结果插件
module.exports = smp.wrap(
  merge(prodConfig, {
    plugins: [
      new BundleAnalyzerPlugin(), // 配置分析打包结果
    ],
  })
);
