const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const newConfig = require('../new-config');

module.exports = (type = 'entry') =>{
    let entry = {}, pageName = '',entryTemplateMap=[]
    let files = [], outHtml = [];
    newConfig['entry'].map((filepath) => {
        if (typeof filepath === 'object') {
            glob.sync(filepath.entryPath).map((onePath) => {
                files.push({
                    entryPath: onePath,
                    template: filepath.template
                })
            })
        } else {
            files = files.concat(glob.sync(filepath));
        }
    });

     // 遍历files文件路径数组，处理数组生成最终符合webpack的entry
     files.map((item) => {
        let key = '';
        let entryPath = '';
        // let name = '';
        if(typeof item === 'object') {
            key = item.entryPath.replace('./src/', '').slice(0, -3); //  // 这个文件名就是dist里的目录
            entryTemplateMap[key] = item.template;
            entryPath = item.entryPath;

        }
        else {
            key = item.replace('./src/', '').slice(0, -3);
            entryTemplateMap[key] = newConfig["default-template"];
            entryPath = item;
        }
        let templateName = key + '.html';
         outHtml.push(new HtmlWebpackPlugin({
            filename: templateName,
            template: entryTemplateMap[key],
            inject: 'body', // 所有JavaScript资源插入到body元素的底部 head: 所有JavaScript资源插入到head元素中。
            // inject： false:所有静态资源css和JavaScript都不会注入到模板文件中,一般需要自定义模板配置的时候使用。
            chunks: [key],// 需要插入该html的js文件，从入口文件中选取对应的js文件名称（打包后的js文件名称）
            minify: {
                removeComments: true,
                // collapseWhitespace: true, //压缩空白
                removeAttributeQuotes: true //删除属性双引号
            },
            // hash: true // 消除缓存，添加版本号
        }))
        entry[key] = entryPath
    });
    // Object.keys(entryTemplateMap).map((key)=>{
    //     let templateName = key + '.html';
    //     outHtml.push(new HtmlWebpackPlugin({
    //         filename: templateName,
    //         template: entryTemplateMap[key],
    //         // inject: true, // 所有JavaScript资源插入到body元素的底部 head: 所有JavaScript资源插入到head元素中。
    //         // inject： false:所有静态资源css和JavaScript都不会注入到模板文件中,一般需要自定义模板配置的时候使用。
    //         chunks: '[name]',// 需要插入该html的js文件，从入口文件中选取对应的js文件名称（打包后的js文件名称）
    //         minify: {
    //             removeComments: true,
    //             collapseWhitespace: true, //压缩空白
    //             removeAttributeQuotes: true //删除属性双引号
    //         },
    //         // hash: true // 消除缓存，添加版本号
    //     }))
    // })
    return {
        entry,
        template: entryTemplateMap,
        outHtml
    }
}
