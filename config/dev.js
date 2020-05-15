const path = require('path');

let filePath = '/src/am-a/am-a-index1/third/main/index.js';
let result = path.parse(filePath)
console.log(result)
let assetsMap = {};
assetsMap[result.dir] ={}
// { root: '/',
//   dir: '/src/am-a/am-a-index1/third/main',
//   base: 'index.js',
//   ext: '.js',
//   name: 'index' }
