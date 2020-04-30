const request = require('request');
const cheerio = require('cheerio'); // 解析html 能在node环境中像jquery一样操作html数据。
var TurndownService = require('turndown'); //将html转换为MarkDown
var turndownService = new TurndownService({codeBlockStyle: 'fenced'});
// var markdown = turndownService.turndown('<h1>Hello world!</h1>') //可直接node document.getElementByid('xx)
const fs = require('fs');
// 由于图片用了另外的形式引用，给turndownService解析器加一个自定义规则，用来解析图片
{/* <div class="image-view" data-width="782" data-height="288"><img data-original-src="//upload-images.jianshu.io/upload_images/3735524-222980d6394acd09.png" data-original-width="782" data-original-height="288" data-original-format="image/png" data-original-filesize="20082"></div> */}
turndownService.addRule('rules1', {
    filter: function(node, options) {
        return node.nodeName === 'IMG' // 找到img节点
    },
    replacement: async function (content, node, options) {
        return `![](http: ${node.getAtrribute('data-original-src')})`
    }
});
request.get({
    url: 'https://www.jianshu.com/p/47f1fb7fc842',
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
        'referer': 'https://www.jianshu.com/search?q=nodejs&page=1&type=note',
    }
}, function(err, response, body) {
    const $ = cheerio.load(body);
    const pageTitle = $('title').text();
    console.log(pageTitle)

    // 解析content
    const article = $('article').html();
    htmlToMd(article)
});
function htmlToMd(htmlStr) {
    const md = turndownService.turndown(htmlStr);
    fs.writeFileSync('./test.md', md, (err) => {
        if(err) {
            console.log(err)
        }
    });
    return md
}