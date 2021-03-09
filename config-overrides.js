const {
  override,
  fixBabelImports,
  addWebpackAlias,
  addPostcssPlugins,
  setWebpackOptimizationSplitChunks,
  addWebpackExternals,
} = require("customize-cra");
const WebpackBar = require("webpackbar");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const isProd = process.env.NODE_ENV === "production";
const isAnalyze = process.env.ANALYZE === "true";
module.exports = override(
  fixBabelImports("antd", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: "css",
  }),
  setWebpackOptimizationSplitChunks({
    cacheGroups: {
      commons: {
        test: /[\\/]node_modules[\\/]/,
        name: "vendors",
        chunks: "all",
        minChunks: 2,
      },
    },
  }),
  addWebpackAlias({
    "@": path.resolve(__dirname, "src"),
  }),
  addWebpackExternals({
    echarts: "window.echarts",
  }),
  addPostcssPlugins([require("tailwindcss"), require("autoprefixer")]),
  (config) => {
    if (isAnalyze) config.plugins.push(new BundleAnalyzerPlugin()); // 打包分析
    // if (isProd) config.plugins.push(new AntdDayjsWebpackPlugin()) // 生产环境启用
    config.plugins.push(new WebpackBar({ profile: true }));
    return config;
  }
);
