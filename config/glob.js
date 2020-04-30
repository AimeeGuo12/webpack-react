let glob = require('glob');
let path = require('path')
let newConfig = require('../new-config');
let files = [], entryTemplateMap=[], entry=[];
// newConfig["entry"].map((filepath) => {
 
//     // console.log('filePath',filepath)
//     if (typeof filepath === 'object') {
//         // console.log(filepath.entryPath)
//         // console.log('qq',(path.resolve('D:/my/my_app/',filepath.entryPath)))
//         // console.log(glob.sync(path.resolve('D:/my/my_app/',filepath.entryPath)))
//         glob.sync(path.resolve('D:/my/my_app/',filepath.entryPath)).map((onePath) => {
//             // console.log('onePath', onePath)
//             files.push({
//                 entryPath: onePath,
//                 template: filepath.template
//             })
//         })
//     } else {
//         files = files.concat(glob.sync(item));
//     }
//     console.log(files)
// });
//  // 遍历files文件路径数组，处理数组生成最终符合webpack的entry
//  files.map((item) => {
//     let key = '';
//     let entryPath = '';
//     if(typeof item === 'object') {
//         console.log(item.entryPath.replace('./src/', ''))
//         console.log(item.entryPath.replace('./src/', '').slice(0, -3))
//         key = item.entryPath.replace('./src/', '').slice(0, -3);
//         entryTemplateMap[key] = item.template;
//         entryPath = item.entryPath;
//     }
//     else {
//         key = item.replace('./src/', '').slice(0, -3);
//         entryPath = item;
//     }
    
//     entry[key] = entryPath
// });
// console.log('entry', entry);
// console.log(entryTemplateMap)
// return {
//     entry,
//     template: entryTemplateMap
// }


let root = './src/am-a/am-a-index1/third/main/index.js';
let sep = /\//;
let filePathList = root.split(sep);
console.log(filePathList)
    let len = filePathList.length;
    let absPath = ''
    let parentPath = path.normalize(root);
    console.log(parentPath)
    filePathList.map((item, index) => {
        absPath = path.join(parentPath, item);})
        console.log(absPath)
