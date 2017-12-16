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

var chatId = 68104629;

bot.on('callback_query', (ctx) => {
    var response = ctx.update.callback_query.data;

    if (response == "No"){
        ctx.reply('Доставка отменена');
    } else {
        console.log(response);

        var options = {
            host: 'localhost',
            path: '/Auction/savecode/' + response,
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

        ctx.reply('Доставка подтверждена');
    }
    
    ctx.answerCbQuery()
});

bot.on('text', (ctx) => {
        chatId =  ctx.message.chat.id;

        var code = ctx.message.text;

        console.log(code);

        ctx.reply('Только по вызову');
    }
);

http.createServer(function (req, res) {
    var url = req.url;

    if (url != "/favicon.ico") {
        bot.telegram.sendMessage(chatId, "Новый контракт на подтверждение: " + url, {
            reply_markup:{
                inline_keyboard: [[
                    { text: 'Подтвердить 👍', callback_data: url },
                    { text: '👎🏿 Отклонить', callback_data: 'No' }
                ]]
            }
        });
        res.write('ok');
    }

    res.end();
}).listen(8080);

bot.startPolling();