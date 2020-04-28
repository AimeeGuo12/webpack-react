const recast = require("recast");
const code = `
function add(a,b) {
    return a+
    b
}
`
const ast = recast.parse(code);
const add = ast.program.body[0];

// console.log(add)
// console.log(add.params[0])
// console.log(add.body.body[0].argument.left)
// 引入变量声明，变量符号，函数声明三种“模具”
const {variableDeclaration, variableDeclarator, functionExpression} = recast.types.builders;
// 将准备好的组件置入模具，并组装回原来的ast对象。
ast.program.body[0] = variableDeclaration("const", [
    variableDeclarator(add.id, functionExpression(
        null,
        add.params,
        add.body
    ))
]);
//将AST对象重新转回可以阅读的代码
// const output = recast.print(ast).code;  //recast.parse的逆向过程 recast.print(recast.parse(source)).code === source
// 如果想打印出格式正常的代码： const output = recast.prettyPrint(ast, { tabWidth: 2 }).code
const output = recast.prettyPrint(ast, { tabWidth: 2 }).code
console.log(output)

// 除了parse/print/builder以外，Recast的三项主要功能：

// run: 通过命令行读取js文件，并转化成ast以供处理。
// tnt： 通过assert()和check()，可以验证ast对象的类型。
// visit: 遍历ast树，获取有效的AST对象并进行更改。
// 我们通过一个系列小务来学习全部的recast工具库：
// https://segmentfault.com/a/1190000016231512?utm_source=tag-newest