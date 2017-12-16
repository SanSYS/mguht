'use strict';

var Telegraf = require('telegraf');
var http = require('http');

const bot = new Telegraf("483063848:AAF8kplE29Z51NUXdUbjRWjA7NDZlAqLVfo");

bot.use((ctx, next) => {
  const start = new Date()
  return next(ctx).then(() => {
    const ms = new Date() - start;
    console.log('Response time %sms', ms);
  })
});

bot.on('text', (ctx) => {
        var code = ctx.message.text;

        console.log(code);

        ctx.reply('Код ' + code + ' принят, средства переведены продавцу');

        var options = {
            host: 'localhost',
            path: '/Auction/savecode/' + code,
            port: 8014,
            method: 'POST'
        };

        var callback = function(response) {
            var str = ''

            response.on('data', function (chunk) {
                str += chunk;
            });

            response.on('end', function () {
                console.log(str);
            });
        };

        var req = http.request(options, callback);
        
        req.write("");
        req.end();
    }
);

bot.startPolling();