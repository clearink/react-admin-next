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
			minimize: true,
			splitChunks: {
				chunks: true,
				minSize: 30000, //文件最小打包体积，单位byte，默认30000，若单个文件不满足会合并其他文件组成一个
				minChunks: 2, //最小使用到次数，超过2次执行
				cacheGroups: {
					// 基本框架
					vendors: {
						name: "vendors",
						test: /[\\/]node_modules[\\/]/,
						// chunks: 'all',
						priority: 10,
					},
					antdesigns: {
						name: "antdesigns",
						chunks: "all",
						test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
						priority: 11,
					},
					jsdk: {
						name: "jsdk",
						chunks: "initial",
						test: /[\\/]node_modules[\\/](china-division|dingtalk-jsapi|lodash|moment)[\\/]/,
						priority: 11,
					},
					"async-commons": {
						// 其余异步加载包
						name: "async-commons",
						chunks: "async",
						minChunks: 2,
						priority: 9,
					},
					default: {
						// 其余同步加载包
						name: "default",
						minChunks: 1,
						priority: -1,
						reuseExistingChunk: true,
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
