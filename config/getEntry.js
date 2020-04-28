const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const newConfig = require('../new-config');

module.exports = () =>{
    let entry = {}, pageName = '',entryTemplateMap=[]
    let files = [], outHtml = [];
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
            key = item.entryPath.replace('./src/', '').slice(0, -3); //  // 这个文件名就是dist里的目录
            entryTemplateMap[key] = item.template;
            entryPath = item.entryPath;
        }
        else {
            key = item.replace('./src/', '').slice(0, -3);
            entryPath = item;
        }
        
        entry[key] = entryPath
    });
    Object.keys(entryTemplateMap).map((key)=>{
        let templateName = key + '.html';
        outHtml.push(new HtmlWebpackPlugin({
            filename: templateName,
            template: entryTemplateMap[key],
            inject: true,
            // chunks: [pageName, 'common'],
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            hash: true
        }))
    })
    
    return {
        entry,
        // template: entryTemplateMap
        outHtml
    }
}
