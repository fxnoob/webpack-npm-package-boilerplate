const path = require('path');
const webpack = require('webpack');
const createVariants = require('parallel-webpack').createVariants;

const bannerString =`
 Webpack boilerplate for npm packages
 `;

function createConfig(options) {
    return {
        entry: './src/index.mjs',
        output: {
            filename: 'index.js',
            library: 'lib',
            libraryTarget: options.target,
            libraryExport: 'default',
            path: path.resolve(__dirname, 'dist'),
        },
        module: {
            rules: [
                {
                    test: /\.mjs$/,
                    type: 'javascript/esm',
                    exclude: /node_modules/
                }
            ]
        },
        optimization: {
            minimize: options.minified
        },
        resolve: {
            extensions: [".mjs", ".webpack.js", ".web.js", ".js", ".json"]
        },
        plugins: [
            new webpack.BannerPlugin(bannerString),
        ],
        devtool: "source-map"
    };
}
module.exports = createVariants({
    minified: [true, false],
    target: ['commonjs2']
}, createConfig);
