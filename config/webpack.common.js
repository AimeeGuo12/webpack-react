const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 配置https://github.com/johnagan/clean-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const getEntry = require('./getEntry.js');
const entryOption = getEntry();
const entry = entryOption.entry;
const outHtml = entryOption.outHtml;

// module.exports = {
//     entry: './src/index.js',
//     output: {
//         path: path.resolve(__dirname, '../dist'),
//         filename: 'bundle.js'
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: './template/index.html', // 自己创建一个html模板，这样可以随意引入需要的html结构
//             title: 'Webpack Demo',  // html的标题成了Webpack Demo
//             filename: 'demo.html',  // 在输出目录生成的html文件名变味了demo.html
//             minify: {collapseWhitespace: true},  // 并且html还被压缩了，去掉了里面所有可折叠的空白元素。
//             hash: true // 引用的js有了hash值，
//         })
//     ],
//     module: {
//         rules: [
//             {
//                 test: /\.css$/, // 将css和loader建立联系
//                 use: ['style-loader', 'css-loader'] ////webpack读取loader顺序是从右向左读,所以后续步骤的loader在前面
//             },
//             {
//                 test: /\.less$/,
//                 use: [{
//                     loader: "style-loader" // creates style nodes from JS strings
//                 }, {
//                     loader: "css-loader" // translates CSS into CommonJS
//                 }, {
//                     loader: "less-loader" // compiles Less to CSS
//                 }]
//             },
//             {
//                 test: /\.(png|jpg|jpeg|gif)$/,
//                 use: [
//                   {
//                     loader: 'url-loader',
//                     options: {
//                       limit: 8192,  //当加载的图片小于limit时会将图片转化为base64格式
//                                    //当图片大于此限制时,使用file-loader处理
//                        name: 'img/[name].[hash:8].[ext]' //配置图片存入dist/img文件夹，图片名为原名+8位哈希值 
//                     }
//                   }
//                 ]
//               },
//               {
//                 test: /\.js$/,
//                 exclude: /(node_modules|bower_components)/,
//                 use: {
//                   loader: 'babel-loader',
//                   options: {
//                     presets: ['es2015']
//                   } 
//                 }
//               }
//         ]
//     },
//     mode: 'development'
// }
// common文件导出一个可传参数的基本配置生成器, 
// prod和dev文件使用webpack-merge将通用配置和各自模式下的配置进行合并导出
function webpackCommonConfigCreator(options) {
    return {
        mode: options.mode,
        entry: entry,
        // entry: './src/index.js',
        output: {
            // filename: "bundle.js",  // 如果都放在一个文件中，文件体积会非常大，所以分割bundle
            // filename: "js/[name][hash].js", // 为了在每次修改代码后，浏览器都能获取到最新的js，通常会对output的名添加hash值
            // filename: "js/bundle.js",
            path: path.resolve(__dirname, '../build'),
            // publicPath: "/"
        },
        plugins: [
            // new HtmlWebpackPlugin({
            //     template: path.resolve(__dirname, '../template/index.html'),// './template/index.html', // 自己创建一个html模板，这样可以随意引入需要的html结构
            //     title: 'Webpack Demo',  // html的标题成了Webpack Demo
            //     filename: 'index.html',  // 在输出目录生成的html文件名变味了demo.html
            //     minify: { collapseWhitespace: true },  // 并且html还被压缩了，去掉了里面所有可折叠的空白元素。
            //     hash: true // 引用的js有了hash值，
            // }),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [path.resolve(process.cwd(), "build/"), path.resolve(process.cwd(), "dist/")]
            }),
            new ExtractTextPlugin({
                filename: "[name][hash].css", //编译后的css由js动态内联在html中，使用此分离到单独的文件
                // filename: "css/[name][hash].css"
            }),
            ...outHtml
        ],
        module: {
            rules: [
                {
                    // test: /\.css$/, // 将css和loader建立联系
                    test: /\.(css|scss)$/,
                    include: path.resolve(__dirname, '../src'),
                    // use: ['style-loader', 'css-loader'], ////webpack读取loader顺序是从右向左读,所以后续步骤的loader在前面
                    // use: ['style-loader', 'css-loader', 'sass-loader'],
                    // use: [
                    //     "style-loader",
                    //     {
                    //         loader: "css-loader",
                    //         options: {
                    //             modules: {
                    //                 mode: "local",
                    //                 localIdentName: '[path][name]_[local]--[hash:base:5]'
                    //             },
                    //             localsConvention: 'camelCase'
                    //         }
                    //     },
                    //     "sass-loader"
                    // ],
                    use: ExtractTextPlugin.extract({
                        fallback: "style-loader",
                        use: [
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        mode: "local",
                                        localIdentName: '[path][name]_[local]--[hash:base64:5]'
                                    },
                                    localsConvention: 'camelCase'
                                }
                            },
                            {
                                loader: "postcss-loader", // 使用postcss对css3属性添加前缀
                                options: { 
                                    ident: 'postcss',
                                    plugins: loader => [
                                        require('postcss-import')({root: loader.resourcePath}),
                                        require('autoprefixer')()
                                    ]
                                }
                            },
                            "sass-loader"
                        ]
                    })
                },
                // 为第三方包配置css解析，将样式表直接导出
                {
                    test: /\.(css|scss)$/,
                    exclude: path.resolve(__dirname, '../src'),
                    use: [
                        "style-loader", // style-loader/url
                        {
                            loader: 'file-loader',
                            options: {
                                name: "css/[name].css"
                            }
                        }
                    ]
                },
                {
                    test: /\.less$/,
                    use: [{
                        loader: "style-loader" // creates style nodes from JS strings
                    }, {
                        loader: "css-loader" // translates CSS into CommonJS
                    }, {
                        loader: "less-loader" // compiles Less to CSS
                    }]
                },
               
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 10240,  //当加载的图片小于limit时会将图片转化为base64格式
                                //当图片大于此限制时,使用file-loader处理
                                name: 'img/[name].[hash:8].[ext]', //配置图片存入dist/img文件夹，图片名为原名+8位哈希值 
                                // name: '[hash].[ext]'
                                publicPath: "/"
                            }
                        }
                    ]
                },
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, '../src'),
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            // presets: ['es2015']
                            presets: ['@babel/preset-react'],
                            plugins: ["react-hot-loader/babel"],
                        }
                    }
                },
                {
                    test: /\.(woff|woff2|eto|ttf|otf)$/,
                    use: ['file-loader']
                },
            ]
        },
        // target: 'node',
        optimization: {
            splitChunks: {  // 分割bundle 打包，发现新生成了一个vendor.js文件，公用的一些代码就被打包进去了, 再次打包不会改变hash值
                chunks: "all", 
                // chunks: "async", // 动态引入的模块 https://segmentfault.com/q/1010000019652490/a-1020000019654450
                // chunks: "initial", // 直接引入的模块
                minSize: 50000,
                minChunks: 1
            }
        }
    }
}
module.exports = webpackCommonConfigCreator;