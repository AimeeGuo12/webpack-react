const path = require('path');
const webpack = require('webpack');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        vendors: ['react', 'react-dom'] //手动指定打包哪些库
    },
    // 输出dll文件
    output: {
        filename: '[name].[hash:8].dll.js',
        path: path.resolve(__dirname, '../dll'),
        library: '[name]'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({ // 输出映射表
            path: path.join(__dirname, '../dll/[name].manifest.json'), // 生成对应的manifest.json，给webpack打包用
            name: '_dll_[name]',  // name = output.library
        })
    ]
}