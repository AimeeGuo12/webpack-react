const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 配置https://github.com/johnagan/clean-webpack-plugin
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // webpack4 作废？
// 将css单独打包成一个文件的插件，它为每个包含css的js文件都创建一个css文件。它支持css和sourceMaps的按需加载
const MiniCssExtractPlugin = require("mini-css-extract-plugin");// //  相比于extract-text-webpack-plugin 异步加载 无重复编译，性能有所提升 支持css分割
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
// const HappyPack = require('happypack'); // 多线程打包 happyPack把所有串行的东西并行处理,使得loader并行处理，较少文件处理时间
const getEntry = require('./getEntry.js');
const entryOption = getEntry();
const entry = entryOption.entry;
const outHtml = entryOption.outHtml;
console.log(outHtml)
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
module.exports = {
    mode: 'development',
        // mode: options.mode,
        entry: entry,
        // entry: './src/index.js',
        // output: {
        //     // filename: "bundle.js",  // 如果都放在一个文件中，文件体积会非常大，所以分割bundle
        //     // filename: "js/[name][hash].js", // 为了在每次修改代码后，浏览器都能获取到最新的js，通常会对output的名添加hash值
        //     // filename: "js/bundle.js",
        //     path: path.resolve(__dirname, '../build'),
        //     // publicPath: "/"
        // },
        output: {
            filename: '[name].js', // [name]指向entry中的key值
            path: path.join(__dirname, '../dist'),
            publicPath: '../../../../',
            library: '[name]',
            libraryTarget: 'umd',
            chunkFilename: '[name][chunkhash:8].js',
        },
        devtool: "inline-source-map",
        externals: {
            'react': 'React',
            'react-dom': 'ReactDOM',
            // 'react-router': 'ReactRouter',
            'redux': 'Redux',
            'react-redux': 'ReactRedux'
        },
        resolve: {
            extensions: ['.js', '.jsx'], // 在导入语句没带文件后缀时，Webpack 会自动带上后缀后去尝试访问文件是否存在。  resolve.extensions 用于配置在尝试过程中用到的后缀列表，
            alias: {
                'src': path.resolve(__dirname, '../src/')
            }
        },
        plugins: [
            // new HtmlWebpackPlugin({
            //     template: path.resolve(__dirname, '../template/index.html'),// './template/index.html', // 自己创建一个html模板，这样可以随意引入需要的html结构
            //     title: 'Webpack Demo',  // html的标题成了Webpack Demo
            //     filename: 'index.html',  // 在输出目录生成的html文件名变味了demo.html
            //     minify: { collapseWhitespace: true },  // 并且html还被压缩了，去掉了里面所有可折叠的空白元素。
            //     hash: true // 引用的js有了hash值，
            // }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            }),
            new FriendlyErrorsWebpackPlugin(),
            new CleanWebpackPlugin({
                cleanOnceBeforeBuildPatterns: [path.resolve(process.cwd(), "build/"), path.resolve(process.cwd(), "dist/")]
            }),
            // new ExtractTextPlugin({
            //     filename: "[name].css", //编译后的css由js动态内联在html中，使用此分离到单独的文件
            // }),
            // new webpack.DllReferencePlugin({
            //      // 注意: DllReferencePlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
            // context: path.resolve(__dirname, '../'),
            // manifest: path.resolve(__dirname, './dll/vendors.manifest.json')  // 读取dll打包后的manifest.json，分析哪些代码跳过
            // }),
            //HappyPack 
            //允许 Webpack 使用 Node 多线程进行构建来提升构建的速度。
            // 使用的方法H与在 Webpack 中定义 loader 的方法类似，只是说，我们把构建需要的 loader 放到了 HappyPack 中，让 HappyPack 来为我们进行相应的操作，
            // 我们只需要在 Webpack 的配置中引入 HappyPack 的 loader 的配置就好了。
            // 其中，threads 指明 HappyPack 使用多少子进程来进行编译，一般设置为 4 为最佳。
            // new HappyPack({ 
            //     id: 'happyBabel',
            //     loaders: [{loader: 'babel-loader'}],
            //     threads: 4,
            //     verbose: true // 允许happyPack输出日志
            // }),
 
            // ...outHtml
        ].concat(outHtml),
        module: {
            rules: [ //每个元素对应一个规则
                // {
                //    test: /\.(jsx|js)$/,
                //    exclude: /node_modules/,
                //    use: {
                //        loader: 'happypack/loader?id=happybabel',
                //        options: {
                //            presets: ["@babel/preset-env", "@babel/preset-react"],
                //            plugins: [
                //                ['import-bee', {
                //                    'style': true
                //                }],
                //             //    'transform-class-properties', // 解决 es6 中使用class声明中 ：defaultProps={} 不支持的问题。需要使用 stage-0 或者 该插件转义。
                //             ["transform-class-properties", { "spec": true }],
                //             //当 spec 为 true 时，
                //             // 使用 Object.defineProperty 取代 title='a' 这样的赋值操作。
                //             // 静态变量（cover）即使没有初始值，也会创建。
                //             "@babel/plugin-transform-runtime",
                //                '@babel/plugin-transform-regenerator'
                //            ]
                //        }
                //    } 
                // },
                {
                    test: /\.(js|jsx)$/,
                    include: path.resolve(__dirname, '../src'),
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"],
                            plugins: [
                             ["transform-class-properties", { "spec": true }],
                             "@babel/plugin-transform-runtime",
                            '@babel/plugin-transform-regenerator'
                            ]
                        }
                    }
                },
                // {
                //     // test: /\.css$/, // 将css和loader建立联系
                //     test: /\.(css|scss)$/,
                //     include: path.resolve(__dirname, '../src'),
                //     // use: ['style-loader', 'css-loader'], ////webpack读取loader顺序是从右向左读,所以后续步骤的loader在前面
                //     // use: ['style-loader', 'css-loader', 'sass-loader'],
                //     // use: [
                //     //     "style-loader",
                //     //     {
                //     //         loader: "css-loader",
                //     //         options: {
                //     //             modules: {
                //     //                 mode: "local",
                //     //                 localIdentName: '[path][name]_[local]--[hash:base:5]'
                //     //             },
                //     //             localsConvention: 'camelCase'
                //     //         }
                //     //     },
                //     //     "sass-loader"
                //     // ],
                //     use: ExtractTextPlugin.extract({
                //         fallback: "style-loader",
                //         use: [
                //             {
                //                 loader: "css-loader",
                //                 options: {
                //                     modules: {
                //                         mode: "local",
                //                         localIdentName: '[path][name]_[local]--[hash:base64:5]'
                //                     },
                //                     localsConvention: 'camelCase'
                //                 }
                //             },
                //             {
                //                 loader: "postcss-loader", // 使用postcss对css3属性添加前缀
                //                 options: { 
                //                     ident: 'postcss',
                //                     plugins: loader => [
                //                         require('postcss-import')({root: loader.resourcePath}),
                //                         require('autoprefixer')()
                //                     ]
                //                 }
                //             },
                //             "sass-loader"
                //         ]
                //     })
                // },
                // // 为第三方包配置css解析，将样式表直接导出
                // {
                //     test: /\.(css|scss)$/,
                //     exclude: path.resolve(__dirname, '../src'),
                //     use: [
                //         "style-loader", // style-loader/url
                //         {
                //             loader: 'file-loader',
                //             options: {
                //                 name: "css/[name].css"
                //             }
                //         }
                //     ]
                // },
                {
                    test: /\.css$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                mode: 'local',
                                modules: true,
                                localIdentName: '[name]--[local]--[hash:base64:5]'
                            }
                        },
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    exclude: /node_modules/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        'postcss-loader',
                        'less-loader'
                    ]
                },
               
                {
                    test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz|xlsx)(\?.+)?$/,
                    exclude: /favicon\.png$/,
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
// module.exports = webpackCommonConfigCreator;