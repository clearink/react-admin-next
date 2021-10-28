const path = require("path");
const { when } = require("@craco/craco");
const WebpackBar = require("webpackbar");
const CracoAntDesignPlugin = require("craco-antd");
const AntdDayjsWebpackPlugin = require("antd-dayjs-webpack-plugin");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
	webpack: {
		alias: {
			"@": path.resolve(__dirname, "src"),
		},
		plugins: [
			// 打包进度
			new WebpackBar({ profile: true }),
			// 时间转换工具采取day替换moment
			new AntdDayjsWebpackPlugin(),
			...when(
				process.env.ANALYZE === "true",
				() => [
					new BundleAnalyzerPlugin({
						analyzerMode: "static", // html 文件方式输出编译分析
					}),
				],
				[]
			),
		],
		optimization: {
			splitChunks: {
				cacheGroups: {
					commons: {
						chunks: "initial",
						minChunks: 2,
						maxInitialRequests: 5,
						minSize: 0,
					},
					vendor: {
						test: /node_modules/,
						chunks: "initial",
						name: "vendor",
						priority: 10,
						enforce: true,
					},
				},
			},
		},
	},
	plugins: [
		{
			plugin: CracoAntDesignPlugin,
			options: {
				customizeTheme: {
					"@primary-color": "#1DA57A",
				},
			},
		},
	],
	style: {
		postcss: {
			plugins: [require("tailwindcss"), require("autoprefixer")],
		},
	},
};
