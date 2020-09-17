/* eslint-disable */
const withLess = require('@zeit/next-less');
const withCss = require('@zeit/next-css');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');

const themeVariables = lessToJS(
	fs.readFileSync(path.resolve(__dirname, './less/antd-custom.less'), 'utf8')
);

module.exports = withCss({
	cssModules: true,
	...withLess({
		lessLoaderOptions: {
			javascriptEnabled: true,
			modifyVars: themeVariables, 
			importLoaders: 0,
		},
		cssLoaderOptions: {
			importLoaders: 3,
			localIdentName: '[local]___[hash:base64:5]',
		},
		webpack: (config, { isServer }) => {
			
			if (isServer) {
				const antStyles = /antd\/.*?\/style.*?/;
				const origExternals = [...config.externals];
				config.externals = [
					(context, request, callback) => {
						if (request.match(antStyles)) return callback();
						if (typeof origExternals[0] === 'function') {
							origExternals[0](context, request, callback);
						} else {
							callback();
						}
					},
					...(typeof origExternals[0] === 'function' ? [] : origExternals),
				];

				config.module.rules.unshift({
					test: antStyles,
					use: 'null-loader',
				});
			}
			return config;
		},
	}),
});