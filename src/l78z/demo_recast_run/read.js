// const recast = require("recast");
// recast.run( function(ast, printSource){
//     printSource(ast)
// })

// 命令行 node read demo.js 运行
// node read可以读取demo.js文件，并将demo.js内容转化为ast对象。
// 同时它还提供了一个printSource函数，随时可以将ast的内容转换回源码，以方便调试

// recast.visit —— AST节点遍历
// #!/usr/bin/env
const recast  = require('recast')

recast.run(function(ast, printSource) {
  recast.visit(ast, {
      visitExpressionStatement: function({node}) {
        console.log(node)
        return false
      }
    });
});

// recast.visit将AST对象内的节点进行逐个遍历。

// 注意

// 你想操作函数声明，就使用visitFunctionDelaration遍历，想操作赋值表达式，就使用visitExpressionStatement。 只要在 AST对象文档中定义的对象，在前面加visit，即可遍历。
// 通过node可以取到AST对象
// 每个遍历函数后必须加上return false，或者选择以下写法，否则报错：
// #!/usr/bin/env node
// const recast  = require('recast')

// recast.run(function(ast, printSource) {
//   recast.visit(ast, {
//       visitExpressionStatement: function(path) {
//         const node = path.node
//         printSource(node)
//         this.traverse(path)
//       }
//     })
// });

// 调试时，如果你想输出AST对象，可以console.log(node)

// 如果你想输出AST对象对应的源码，可以printSource(node)