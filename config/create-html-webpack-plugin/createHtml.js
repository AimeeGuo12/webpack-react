// const path = require('path');
// const cheerio = require('cheerio'); // cheerio 分析标记, 并提供用于遍历/操作生成的数据结构的 api。
// const h = require('./hammer');
// //cheerio：   https://blog.csdn.net/fqq_5280/article/details/83932635
// module.exports = function createHtml(fileInfo, templateContent, templateName, publicPath, targetPath, beforeAppendCss, beforeAppendJs) {

//     try {
//         let filePath = fileInfo['.css'].dir;
//         let htmlPath = filePath + '/' + templateName;
//         let cssPath = path.join(publicPath, filePath, fileInfo['.css'].base);
//         let jsPath = path.join(publicPath, filePath, fileInfo['.js'].base);
//         let content = templateContent;

//         let $ = cheerio.load(content); // 加载html得到一个cheerio对象
//         beforeAppendCss && beforeAppendCss($);
//         $('head').append(`<link rel="stylesheet" href="${cssPath}" />`);
        
//         beforeAppendJs && beforeAppendJs($);
//         $('body').append(`<script src="${jsPath}"></script>`);

//         h.writeFile(targetPath, htmlPath, $.html());
//     }
//     catch(e) {
//         console.log('createHtml', e);
//     }
// }