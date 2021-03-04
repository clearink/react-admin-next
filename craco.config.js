const { when } = require("@craco/craco");
const path = require("path");
const WebpackBar = require("webpackbar");
const isAnalyze = process.env.ANALYZE === "true";
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  webpack: {
    plugins: [
      new WebpackBar(),
      ...when(isAnalyze, () => [new BundleAnalyzerPlugin()], []),
    ],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    externals: {
      echarts: "echarts",
    },
  },
};
