// class EndWebpackPlugin {
//     constructor(doneCallback, failCallback) {
//         // 存下在构造函数中传入的回调函数
//         this.doneCallback = doneCallback;
//         this.failCallback = failCallback;
//     }
//     apply(compiler) {
//         compiler.hooks.done.tab('EndWebpackPlugin', (stats) => {
//             // 在 done 事件中回调 doneCallback
//             this.doneCallback(stats);
//         });
//         compiler.hooks.failed.tab('EndWebpackPlugin', (err) => {
//             this.failCallback(err);
//         })
//     }
// }

// module.exports = EndWebpackPlugin;

// 使用
// module.exports = {
//     plugins:[
//       // 在初始化 EndWebpackPlugin 时传入了两个参数，分别是在成功时的回调函数和失败时的回调函数；
//       new EndWebpackPlugin(() => {
//         // Webpack 构建成功，并且文件输出了后会执行到这里，在这里可以做发布文件操作
//       }, (err) => {
//         // Webpack 构建失败，err 是导致错误的原因
//         console.error(err);        
//       })
//     ]
//   }
// 两个事件： - done：在成功构建并且输出了文件后，Webpack 即将退出时
//发生； - failed：在构建出现异常导致构建失败，Webpack 即将退出时发生； 