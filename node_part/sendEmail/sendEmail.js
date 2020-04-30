// ebhqyhtnutivbeed
// nodemailer
// nodemailer 是一款简单易用的基于于SMTP协议（或 Amazon SES）的邮件发送组件
// cron
// cron可以指定每隔一段时间执行指定的程序、也可以指定每天的某个时刻执行某个程序、还可以按照星期、月份来指定。
let nodemailer = require('nodemailer');
let cronJob = require('cron').CronJob;
let config = require('./emailConfig.js');
/**
 * created by Aimee Guo on 2020/4/30
 */
function sendEMail (from, aliasName, tos, subject, msg) {
    // 开启一个STMP连接池
    let transport = nodemailer.createTransport({
        host: "smtp.qq.com",
        port: 465,
        secureConnection: true, // use SSL
        secure: true,
        auth: {
            user: from,
            pass: "ebhqyhtnutivbeed"  //这个password 是stmp提供的  不是扣扣的密码
        }
    })
    let mailOption = {
        //from: '标题别名 <foobar@latelee.org>',
        from: aliasName + ' ' + '<' + from + '>',
        to: tos,
        subject: subject, // 标题
        html: msg
        // text: msg
    }

    transport.sendMail(mailOption, function(error, response) {
        if(error) {
            console.log(error)
        } else {
            console.log(response)
        }
        transport.close();// 如果没用，关闭连接池
    })
}

// Seconds Minutes Hours DayofMonth Month DayofWeek Year或
// Seconds Minutes Hours DayofMonth(天 月 0~31) Month DayofWeek（天 星期 1~7 1=sun）
// new CronJob('* * * * * *', function() {
//     console.log('You will see this message every second');
//   }, null, true, 'America/Los_Angeles');

var job = new cronJob({
    cronTime: '05 16 * * * *',        // pre second
    onTick: () => {
        sendEMail(config.email.from, config.email.aliasName, config.email.tos, config.email.subject, config.email.msg)
        console.log('定时任务执行完毕!');
    },
    start: true,
    timeZone: 'Asia/Shanghai'
  });


// module.exports = sendMail;
// sendEMail(config.email.from, config.email.aliasName, config.email.tos, config.email.subject, config.email.msg)


// var transport = nodemailer.createTransport(smtpTransport({
//     host: "smtp.126.com", // 主机，各服务商的主机地址不同，比如qq的是smtp.qq.com
//     secure:false, // 使用 SSL
//     secureConnection: false, // 使用 SSL
//     port: 25, // 网易的SMTP端口，各个服务商端口号不同，比如qq的是465
//     auth: {
//     user: "nodemail_123@126.com", // 账号
//     pass: "xxxxxx" // 如果是网易邮箱，这个并不是登录密码，而是授权码
//     }
//     }));
//     // 设置邮件内容
//     var mailOptions = {
//     from: "nodemail_123<nodemail_123@126.com>", // 发件人地址
//     to: "nodemail_456@126.com,hello123@126.com", // 收件人列表,逗号分隔，可以放多个
//     subject: "Happy every day", // 标题
//     html: "<b>Good Morning!</b> 该起床了！" // html 内容
//     }
//     // 发送邮件
//     transport.sendMail(mailOptions, function(error, response){
//     if(error){
//     console.log(error);
//     }else{
//     console.log("Message send ok");
//     }
//     transport.close(); // 如果没用，关闭连接池
//     });