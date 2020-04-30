Nodejs是javascript的运行程序，使用Nodejs最大的优点是可以让javascript运行在服务器端，NodeJS是基于chrome的v8架构的，它主要的的特点是基于异步的I/O处理，所有的事件都会被事件循环器处理，当事件完成通过回调函数来传递结果，这和典型的Ajax请求一样。这样直接导致Node的程序都是单线程的，单线程的优点是程序设计简单，不用考虑复杂的线程通信，这样也就没有所谓的死锁问题，虽然Node是单线程，但由于其异步执行的优势，使得Node也可以轻松的实现并发。

#### NodeJS的安装

直接通过 [https://nodejs.org/en/](https://link.jianshu.com?t=https%3A%2F%2Fnodejs.org%2Fen%2F) 网站即可下载Nodejs，当前的最新版本9.3.0,建议使用8.9.3稳定版，下载NodeJS的时候依然建议下载非安装版，选择other download。

[object Promise]

NodeJS的下载路径

之后选择Binary (.zip)这个进行下载

[object Promise]

NodeJS的下载路径

下载完成之后，解压，把Nodejs的安装目录添加到环境变量的path中，安装就完成了（注意Nodejs中没有bin路径）。

#### NPM简介

要很好的使用npm，在目前的NodeJS中，npm是自动安装的，大家可以发现NodeJS目录中有npm.cmd程序，这是一个可执行文件，它用来运行npm，npm是一个模块管理工具，有点类似于maven，开发人员可以将模块下载到项目中或者一个全局的位置，全局的位置默认会在NodeJS安装目录的`node_modules` 文件夹中。这里仅仅只介绍几个简单的命令，如果希望详细研究NPM，可以查询npm的官方文档。

通过命令`npm -v` 可以查询npm的版本

```
>npm -v
5.5.1
```

使用npm install可以安装模块，有一个非常好用的前台模块管理工具bower，我们安装一下bower，通过如下命令可以安装

```
D:\test (master -> origin)
> npm install bower -g
npm WARN deprecated bower@1.8.2: ...psst! Your project can stop working at any moment because its dependencies can change. Prevent this by migrating to Yarn: https://bower.io/blog/2017/how-to-migrate-away-from-bower/
D:\nodejs\bower -> D:\nodejs\node_modules\bower\bin\bower
+ bower@1.8.2
added 1 package in 30.176s
```

加上-g表示全局安装，安装完成之后会存储到nodejs目录的node\_modules文件夹中。如果不使用全局安装会自动安装在本地目录中。另外可以通过@来指定安装的版本号

```
>npm install jquery@latest -g
+ jquery@3.2.1
added 1 package in 2.313s
```

已上安装了jquery的最新版。另外通过remove可以移除module

```
> npm remove bower -g
removed 1 package in 3.282s
```

npm就简单介绍到这里，接下来开始我们的第一个nodejs的程序

#### nodejs起步

nodejs是一个javascript的运行环境，要运行第一个helloworld的程序，首先建立一个js的文件，我建立了begin.js在该文件中写了一行代码

```
console.log("hello world!");
```

之后在该文件夹中使用node命令来执行这个文件

```
E:\study\nodejs_2018\01_hellojs>node begin.js
hello world!
```

输出了结果，这也就表示Nodejs已经成功完成安装。

#### require介绍

在Nodejs中提供了require函数来加载另外一个模块，这个模块可以是通过npm下载的也可以是自定义模块，首先我们自己定义一个函数模块，创建method.js文件

```
exports.M = {
    begin: function() {
        console.log("begin js");
    },
    end: function () {
        console.log("end js");
    }
}
```

已上代码通过exports生成了一个M模块，里面有begin和end两个方法。下面在一个module1.js文件中引入该模块

```
var m = require("./methods")
console.log(m);
m.M.begin();
m.M.end();
```

通过require引入了该模块，注意要加上`./` ，另外就是methods不加js，并且定义了变量m来存储该模块，此后即可通过m.M来引入模块中的方法。

查询一下结果

```
E:\study\nodejs_2018\01_hellojs>node module1.js
{ method: { begin: [Function: begin], end: [Function: end] } }##显示模块中的值
begin js ##调用模块的begin方法
end js

```

#### 创建一个nodejs的server

Nodejs由于是javascript的运行环境，所以我们可以直接将javascript运行在服务器端，接下来我们编写一个server.js来启动一个简单的服务。首先创建server.js文件,完成如下几个步骤

1、引入http模块

```
var http = require("http")
```

2、创建server

```
http.createServer(serverOk).listen(8088);
```

已上代码创建了一个server，当server创建完成之后会执行回调函数serverOk，该回调函数中有两个参数一个是request，另外一个是response。该server启动在8088端口中。

3、编写回调函数

```
function serverOk(req,resp) {
   resp.writeHead(200,{"Content-type":"text/plain"});
   resp.write("hello nodejs!");
   resp.end();
};
```

回调函数有两个参数，req等于request对象，resp等于response对象，首先使用resp.writeHead()编写简单的输出信息，状态为200，类型是原始类型，并且输出了hello nodejs，最后通过resp.end()结束输出。

4、运行

首先看看完整代码

```
var http = require("http");
function serverOk(req,resp) {
   resp.writeHead(200,{"Content-type":"text/plain"});
   resp.write("hello nodejs!");
   resp.end();
};
http.createServer(serverOk).listen(8088);
```

使用node运行之后，只要在浏览器输入localhost:8088，会看到"hello nodejs!"的字符输出。

#### 基于模块来修改上一个程序

我们可以将创建服务器的这段代码编写到一个模块中，首先创建server\_module.js

```
var http = require("http");

function serverOk(req,resp) {
    resp.writeHead(200,{"Content-type":"text/plain"});
    resp.write("hello node module!");
    resp.end();
}
module.exports = {
    startServer: function(port) {
        http.createServer(serverOk).listen(port);
    }
};
```

这里变换了一种写法，首先在exports前增加了module，个人感觉这样说明要清晰一些，当然module是可以省略的，另外就是该module并没有编写具体的导出的名称，此时可以直接调用，该module中有两个方法，startServer表示启动服务，此时回调serverOk写在了模块的外面，这表示serverOk是私有的，不会被导出（就当前例子中，该方法也没有导出的意义）。调用代码也比较简单，创建文件test.js

```
var Server = require("./server_model");
console.log(Server);//输出确定仅仅导出startServer
Server.startServer(8099);
```

运行之后访问localhost的8099端口即可看到相应的输出。但这个server显然有一个比较严重的问题，就是他只能监听一个请求，另外就是不能渲染html。下面我们先来解决html的渲染问题。然后在解决路由问题

#### 渲染html文件

渲染html是比较重要的一个步骤，Nodejs通过文件的读写来完成该操作，首先需要引入fs这个模块

```
var fs = require("fs");
```

接着通过fs.ReadFile可以读取文件

```
fs.readFile(path,null,function (error,data) {
        if(error) {
            resp.writeHead(404);
            resp.write("find file error!");
        }
        resp.writeHead(200,{"Content-type":"text/html"});
        resp.write(data);
        resp.end();
    });
```

第一个参数表示file的路径，第二个参数用来存储传入的数据，第三个参数就是回调，回调中有两个参数，第一个表示error，如果发现错误就会为第一个参数赋值，第二个参数表示如果成功返回的内容。代码中首先判断了是否有error，如果没有error就直接输出data，data就是读取到的html的文件内容，注意content-type的类型必须修改为text/html。如果发现错误直接显示404.

完整代码如下所示

```
var http = require("http");
var fs = require("fs");

function renderHTML(path,resp) {
    fs.readFile(path,null,function (error,data) {
        if(error) {
            resp.writeHead(404);
            resp.write("find file error!");
        } else {
            resp.write(data); 
        }
        resp.end();
    });

}

function serverOk(req,resp) {
    resp.writeHead(200,{"Content-type":"text/plain"});
  //渲染hello.html
    renderHTML("./hello.html",resp);
}
module.exports = {
    startServer: function(port) {
        http.createServer(serverOk).listen(port);
    }
};
```

调用代码和上一节类似，然后看一下hello.html文件并且完成服务器的启动

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
    <h1>hello html</h1>
</body>
</html>
```

此时启动，并且访问localhost的8099即可显示hello.html的内容。

#### 路由

这一小节将要实现不同的请求访问不同的页面，操作原理非常简单，通过request的url可以获取访问路径，通过url模块中的parse方法可以将url转换为json对象，其中pathname可以获取访问的路径变量。将server\_module.js的代码稍作调整即可

```
var http = require("http");
var fs = require("fs");
var url = require("url")

function renderHTML(path,resp) {
    //路径判断
    if(path=="/"||path=="") {
        path = "./index.html";
    } else {
        path = "./"+path+".html";
    }
    //console.log(path);
    fs.readFile(path,null,function (error,data) {
        if(error) {
            resp.writeHead(404);
            resp.write("find file error!");
        } else {
            resp.write(data);
        }
        resp.end();
    });

}

function serverOk(req,resp) {
    resp.writeHead(200,{"Content-type":"text/html"});
    //获得访问的路径，如果输入localhost:8089/abc/bbd会得到/abc/bbd
    var pathname = url.parse(req.url).pathname;
    renderHTML(pathname,resp);
}
module.exports = {
    startServer: function(port) {
        http.createServer(serverOk).listen(port);
    }
};
```

这里简单实现了Nodejs的基本流程，但在实际开发中一般都不会使用原生的方法来处理，Nodejs中有大量的模块可以帮助开发人员来完成这些操作，接下来将会以Express为例来详细讲解。