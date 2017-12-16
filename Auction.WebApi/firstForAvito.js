// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.avito.ru/moskva/telefony/telefon_ayfon_6_s_plyus_128_pamyat_1219971851
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var style = {
        btn: 'background: rgb(252, 194, 38);display: inline-block;font-size: 16px;padding: 0px 11px;line-height: 25px;border-radius: 4px;cursor:pointer',
        blueButtonClasses: 'header-button-add-item-2cgWl button-root-1U-0K button-root_size-m-3mjxJ button-root_design-primary-eZ5Gi',
        iframe: 'opacity:0.1;position: absolute;width: 0%;height: 100%;z-index: 1000;background: #fff;right: 0;box-shadow: -10px 0 26px rgba(0,0,0,0.5);',
        iframeCloseButton: 'opacity:0.1;position: absolute;right: 0%;height: 56px;z-index: 99999999999999;background: #343a40;color: #FFF;padding-left: 12px;line-height: 55px;font-size: 24px;font-weight: bold;cursor: pointer;padding-right: 12px;'
    };

    var price = document.querySelector('.title-info-title-text');

    price.innerHTML += '<span id="sysByEth" style="'+style.btn+'">Купить за ETH</span>';

    var doc = $(document.body);

    doc.on('click', '#sysByEth', function(e){
        var btn = e.target;

        console.log(btn, 'Дёргай етериум');
    });

    var self = $('.header-button-wrapper-iwCvN');

    self.after('<div class="header-button-wrapper-iwCvN openAuction" style="margin-right:12px;background:#f00"><a href="javascript:void(0)" class="' + style.blueButtonClasses + '" style="background:#f00">Аукционы</a></div>');

    doc.on('click', '#closeAuction', function(e){
        doc.find('#auctionIframe')
           .animate({
               opacity: 0.25,
               width: "0%"
           }, 500, function(){
            doc.find('#auctionIframe').remove();
        });

        doc.find('#closeAuction')
           .animate({
               opacity: 0.25,
               right: "0%"
           }, 500, function(){
            doc.find('#closeAuction').remove();
            doc.css('overflow', '');
        });
    });

    doc.on('click', '.openAuction', function(e){
        doc.append('<iframe id="auctionIframe" src="https://cbe97c02.ngrok.io/index.html?q=' + +new Date() + '#lot" style="' + style.iframe + '"></iframe>');
        doc.append('<div id="closeAuction" style="' + style.iframeCloseButton + '" title="Закрыть">✖</div>');
        doc.css('overflow', 'hidden');

        doc.find('#auctionIframe')
           .animate({
               opacity: 1,
               width: "80%"
           }, 500, function(){
        });

        doc.find('#closeAuction')
           .animate({
               opacity: 1,
               right: "80%"
           }, 500, function(){
        });

        console.log('Открыть аукцион');
    });
})();