const webpackConfigCreator = require('./webpack.common');
const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const optimizeCss = require('optimize-css-assets-webpack-plugin'); // 生产模式下的css进行压缩
// 通常情况下，我们打包出来的js,css都是带上版本号的，通过HtmlWebpackPlugin可以
// 自动帮我们在index.html里面加上带版本号的js和css
// 但是在某些情况，index.html模板由后端渲染，那么我们就需要一份打包清单，知道打包后的文件对应的真正路径
// 比如在SSR开发时，前端打包后，node后端就可以通过这个json数据，返回正确资源路径的html模板
// https://segmentfault.com/a/1190000019395237?utm_source=tag-newest
const ManifestPlugin = require('webpack-manifest-plugin');
const config = {
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "js/[name][chunkhash].js" , // 有发生改变的模块保持名称以使浏览器从缓存中获取，在生产模式下使用[chunkhash]替代[hash]
        chunkFilename: '[name].[contenthash:8].chunk.js'
    },
    plugins: [
        new optimizeCss({
            cssProcessor: require('cssnano'),
            cssProcessorOptions: {discardComments: {removeAll: true}},
            canPrint: true
        }),
        new ManifestPlugin(),
        // new webpack.DllReferencePlugin({
        //     manifest: path.resolve(__dirname, './dll/vendors.manifest.json')  // 读取dll打包后的manifest.json，分析哪些代码跳过
        // })
    ],
    devtool: "source-map"
    
}
const options = {
    mode: "production",
}
module.exports = merge(webpackConfigCreator(options), config);