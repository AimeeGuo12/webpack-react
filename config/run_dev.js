const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const webpackDevServer = require('webpack-dev-server');
const webpackCommonConfig = require('./webpack.common');
const webpackDllConfig = require('./webpack.dll');

const getEntry = require('./getEntry');
const config = require('../new-config.json');

let libEntryTmp = getEntry('lib');
let libEntries = libEntryTmp.entry;
let libEntryTmpMap = libEntryTmp.template;
// 在编译之后打印文字的webpack插件
// const LogAfterCompilePlugin = require('./LogAfterCompilePlugin');
// const CreateHtmlPlugin = require('./create-html-webpack-plugin/CreateHtmlPlugin');
// 工具集
const h = require('./hammer');
let projectPath = path.join(__dirname, '../');
// 目标路径
let targetPath = webpackCommonConfig.output.path;

module.exports = (m) => {
    copyDir();
    if(config['dll-entry'] && config['dll-entry'].length>0) {
        runDllCompile()
            .then(()=> {
                let manifestPath = getManifestPath();
                webpackCommonConfig.plugins.unshift(
                    new webpack.DllReferencePlugin({
                        manifest: require(manifestPath)
                    })
                )
                runCompile(m)
            })
    }else{
        runCompile(m)
    }
}
function getManifestPath() {
    let outputPath = webpackDllConfig.output.path;
    let fileList = fs.readdirSync(outputPath);
    let manifestPath = '../dll/vendor-manifest.json';
    for(let filename of fileList) {
        if(path.extname(filename) === '.json') { // path.extname 返回文件的后缀名
            manifestPath = path.join(outputPath, filename);
            break;
        }
    }

    return manifestPath;
}

function runDllCompile() {
    webpackDllConfig.plugins.push(new LogAfterCompilePlugin({
        word: 'XXX'
    }));
    return new Promise((resolve, reject) => {
        webpack(webpackDllConfig, (err) => {
            if(err) {
                console.log(err);
            }
            resolve();
        })
    })
}
// 执行编译
function runCompile(m = []) {
    let pageCompiler = null;
    let pageWBC = {
        ...webpackCommonConfig,
        plugins: [new webpack.HotModuleReplacementPlugin()]  //1.热更新模块配置
    };
    pageCompiler = webpack(pageWBC)
    let libCompile = webpack({
        ...webpackCommonConfig,
        entry: libEntries
    })
    libCompile.run(function(err, stats) {
        if(err) {
            console.log(err)
        }
        let server = new webpackDevServer(pageCompiler, {
            contentBase: path.join(__dirname, '../dist'),
            // proxy: config.proxy,
            stats: 'errors-only',
            inline: config['dev-server']['refresh-immediately'],
            // hot: true // 开启webpackDevServer热加载
        })
        server.listen(3000, '127.0.0.1', () => {
            console.log('Starting server on http://localhost:8080');
        })
    })
}
// 执行文件复制
function copyDir() {

    if(!h.isFileExist(targetPath)) {
        fs.mkdirSync(targetPath);
    }
    config.copy.map((obj) => {

        let absFrom = path.join(projectPath, obj.from);
        let absTo = path.join(targetPath, obj.to);

        if(!h.isFileExist(absTo)) {
            h.copyDirSync(targetPath, absFrom, absTo);
        }
    });
}