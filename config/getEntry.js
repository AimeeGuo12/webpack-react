var glob = require('glob');
var newConfig = require('../new-config');
var webpackConfig = {
    /* 一些webpack基础配置 */
};
// function getEntries(globPath) {
//     var files = glob.sync(globPath),
//         entries = {};
//         files.forEach(function(filepath) {
//             var split = filepath.split('/');
//             var name = split[split.length - 2];

//             entries[name] = './' + filepath;
//         });
//         return entries;
// }

// var entries = getEntries('src/**/**/index.js')
// Object.keys(entries).forEach(function(name){
//     webpackConfig.entry[name] = entries[name];

//     var plugin = new HtmlWebpackPlugin({
//         filename: name + '.html',
//         template: template,
//         inject: true,
//         chuncks: [name]
//     })
//     webpackConfig.plugins.push(plugin)
// })

function getEntries() {
    // var files = glob.sync(),
    var entry = [], entryTemplateMap = [];
    var files = []
    newConfig["entry"].map((filepath) => {
        if (typeof filepath === 'object') {
            glob.sync(filepath.entryPath).map((onePath) => {
                files.push({
                    entryPath: onePath,
                    template: filepath.template
                })
            })
        } else {
            files = files.concat(glob.sync(item));
        }
    });

     // 遍历files文件路径数组，处理数组生成最终符合webpack的entry
     files.map((item) => {
        let key = '';
        let entryPath = '';
        if(typeof item === 'object') {
            key = item.entryPath.replace('./src/', '').slice(0, -3);
            entryTemplateMap[key] = item.template;
            entryPath = item.entryPath;
        }
        else {
            key = item.replace('./src/', '').slice(0, -3);
            entryPath = item;
        }
        
        entry[key] = entryPath
    });

    return {
        entry,
        template: entryTemplateMap
    }
}

// var entries = getEntries('src/**/**/index.js')
// Object.keys(entries).forEach(function (name) {
//     webpackConfig.entry[name] = entries[name];

//     var plugin = new HtmlWebpackPlugin({
//         filename: name + '.html',
//         template: template,
//         inject: true,
//         chuncks: [name]
//     })
//     webpackConfig.plugins.push(plugin)
// })