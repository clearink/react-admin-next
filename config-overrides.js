const {
	override,
	fixBabelImports,
	addWebpackAlias,
	addPostcssPlugins,
	setWebpackOptimizationSplitChunks,
	addWebpackExternals,
	overrideDevServer,
} = require("customize-cra");
const WebpackBar = require("webpackbar");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const isProd = process.env.NODE_ENV === "production";
const isAnalyze = process.env.ANALYZE === "true";

// 开发服务器代理
const proxy = {
	"/github": {
		target: "https://proapi.azurewebsites.net",
		changeOrigin: true,
	},
};
module.exports = {
	webpack: override(
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
	),
	// 开发服务器代理
	devServer: overrideDevServer((config) => ({ ...config, proxy })),
};
