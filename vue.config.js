const path = require('path');
const glob = require('glob');
const GenerateJsonPlugin = require('generate-json-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

function resolve(dir) {
	return path.join(__dirname, dir);
}
const BEHAVIOR = process.env.BEHAVIOR;
const VUE_APP_enviroment = process.env.VUE_APP_enviroment;
const nowTime = new Date().getTime();
const isProd = process.env.NODE_ENV === 'production';

// 多页面映射 每次新增项目需要在此添加相关内容
let pagesInfoMap = {
	udream_newyear: {
        title: "新年活动2023",
        template: 'public/udream_newyear.html',
        chunks: [
            'udream_newyear',
            'chunk-vendors',
            'chunk-common'
        ]
    }
};

// 公共页面参数
Object.keys(pagesInfoMap).forEach((item) => {
	pagesInfoMap[item] = Object.assign(pagesInfoMap[item], {
		VDATE: nowTime,
        BEHAVIOR: BEHAVIOR,
        enviroment: VUE_APP_enviroment,
        // commonPath: BEHAVIOR === 'build' ? process.env.VUE_APP_staticPath : 'https://wx-test.51yxm.com/html5/root/common/',
	});
});

// 配置pages参数
const pagesEntry = (entry) => {

	if(!entry) return
	const entries = {};
	glob.sync(entry).forEach((item) => {
		const fileName = path.basename(item, path.extname(item));

		entries[fileName] = {
			// 入口文件
			entry: `src/pages/${fileName}/main.js`,
			// 模板文件
			template: pagesInfoMap[fileName].template ? pagesInfoMap[fileName].template : 'public/index.html',
			// 输入文件
            filename: `${fileName}.html`,

			// index.html自定义参数
			title: pagesInfoMap[fileName].title,
			VDATE: pagesInfoMap[fileName].VDATE,
			BEHAVIOR: pagesInfoMap[fileName].BEHAVIOR,
            // commonPath: pagesInfoMap[fileName].commonPath,
            enviroment: VUE_APP_enviroment,

            // 抽离代码
            chunks: pagesInfoMap[fileName].chunks
		};
	});
	return entries;
};

module.exports = {
	publicPath: './',
	outputDir: `./dist/${VUE_APP_enviroment}`,
	pages: pagesEntry('./src/pages/*'), // multi-page 模式
	lintOnSave: 'warning',
	productionSourceMap: false,
	filenameHashing: true,
	css: {
		extract: {
			// filename: `css/[name].css?v=${nowTime}`,
			// chunkFilename: `css/[name].css?v=${nowTime}`,
			filename: isProd ? `css/[name].[contenthash].css` : `css/[name].[hash].css`,
            chunkFilename: isProd ? `css/[name].[contenthash].css` : `css/[name].[hash].css`
		},
	},
	chainWebpack: (config) => {
		// config.output.filename(`js/[name].js?v=${nowTime}`).end();
		config.output.filename(isProd ? "js/[name].[contenthash].js" : "js/[name].[hash].js");
		config.output.chunkFilename(isProd ? "js/[name].[contenthash].js" : "js/[name].[hash].js");

		config.resolve.alias
			.set('@', resolve('src'))
			.set('@pages', resolve('src/pages'))
			.set('@components', resolve('src/components'))
			.set('@assets', resolve('src/assets'))
			.set('@images', resolve('src/assets/images'));
	},
	configureWebpack: (config) => {
		config.plugins.push(
			new GenerateJsonPlugin('data/version.json', {
				version: nowTime,
            }),
            new CopyWebpackPlugin(
                [
                    {
                        from: 'src/assets/static',
                        to: 'static',
                        toType: 'dir',
                    }
                ]
            ),
			new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
		);

		config.optimization = {
			splitChunks: {
				cacheGroups: {
					// 抽离所有入口的公用资源为一个chunk
					common: {
						name: 'chunk-common',
						chunks: 'initial',
						minChunks: 2,
						maxInitialRequests: 5,
						minSize: 0,
						priority: 1,
						reuseExistingChunk: true,
						enforce: true,
					},
					// 抽离node_modules下的库为一个chunk
					vendors: {
						name: 'chunk-vendors',
						test: /[\\/]node_modules[\\/]/,
						chunks: 'initial',
						priority: 2,
						reuseExistingChunk: true,
						enforce: true,
					}
				},
			},
		};
    },
	
};
