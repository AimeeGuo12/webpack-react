// const webpack = require('webpack');
// const webpackDevServer = require('webpack-dev-server');
// const webpackConfig = require('../config/webpack.dev.js');

// // var express = require('express');
// // var app = express();

// // webpack 编译器
// const compiler = webpack(webpackConfig);
// const options = Object.assign({}, webpackConfig.devServer, {
//     open: true
// })
// const server = new webpackDevServer(compiler, options);
// server.listen(3000, '127.0.0.1', () => {
//     console.log('Starting server on http://localhost:8080');
// })


const modelReg = /(am-a)|(am-b)|(dev\-component)|(page\-shell)|(hrhi)/

const build = require('../config/run_dev');
let args = [...process.argv];

args.splice(0, 2);

let compileModule = [];

args.map((item) => {
    if(modelReg.test(item)) {
        compileModule.push(item);
    }
});

if(compileModule.length > 0) {
    build(compileModule.concat('page-shell'));
}
else {
    build();
}