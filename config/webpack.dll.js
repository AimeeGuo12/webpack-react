const path = require('path');
const webpack = require('webpack');
const config = require('../new-config.json');
const webpackCommonConfig = require('./webpack.common');
const rules = webpackCommonConfig.module.rules;
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        vendors: ['react', 'react-dom'] //手动指定打包哪些库
    },
    // externals: {
    //     'react': 'React',
    //     'react-dom': 'ReactDOM',
    //     'react-router': 'ReactRouter',
    //     'redux': 'Redux',
    //     'react-redux': 'ReactRedux',
    //     'axios': 'axios',
    //     'nc-lightapp-front': 'nc-lightapp-front',
    //     'nc-report': 'nc-report',
    //     'nc-hr-report': 'nc-hr-report'
    // },
    watch: config['dll-entry'].watch,
    // 输出dll文件
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, '../dll'),
        library: '[name]_[hash]_library'
    },
    module: {
        rules,
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({ // 输出映射表  生成manifest.json映射文件，供 DLLReferencePlugin 映射到相关的依赖上去的。
            path: path.join(__dirname, '../dll/[name].manifest.json'), // 生成对应的manifest.json，给webpack打包用
            name: '[name]_[hash]_library',  // name = output.library
        })
    ].concat(webpackCommonConfig.plugins)
}