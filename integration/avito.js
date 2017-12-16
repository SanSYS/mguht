// window.integrate = integrate;

integrate();

function integrate() {
  let repo   = 'https://localhost:443/mguht/';
  let rpcURL = 'https://localhost:443/eth'; // 'http://5.178.85.201:8545'; // 'https://localhost:443/eth';
  let apiUrl = 'https://cbe97c02.ngrok.io/A';

  init();

  function init() {
    console.log(1);

      var doc = $(document.body);

      // console.dir(Web3);

      // var provider = new Web3.providers.HttpProvider(rpcURL);
      // var web3     = new Web3(provider);

      // console.log(web3);

    var style = {
      btn: 'background: rgb(252, 194, 38);display: inline-block;font-size: 16px;padding: 0px 11px;line-height: 25px;border-radius: 4px;cursor:pointer',
      blueButtonClasses: 'header-button-add-item-2cgWl button-root-1U-0K button-root_size-m-3mjxJ button-root_design-primary-eZ5Gi'
    };

    var price = document.querySelector('.title-info-title-text');

    price.innerHTML += '<span id="sysByEth" style="'+style.btn+'">Купить за ETH1</span>';


    doc.on('click', '#sysByEth', function(e){
      var btn = e.target;

      console.log('эфир');

      // var coinbase = web3.eth.coinbase;
      // var balance = web3.eth.getBalance(coinbase);
      // var account = web3.eth.accounts[0];

      // console.dir(coinbase);
      // console.dir(balance);
      // console.dir(web3.eth.accounts);



      console.log(btn, 'Дёргай етериум');
    });

    var self = $('.header-button-wrapper-iwCvN');

    self.after('<div class="header-button-wrapper-iwCvN openAuction" style="margin-right:12px;background:#f00"><a href="javascript:void(0)" class="' + style.blueButtonClasses + '" style="background:#f00">Аукционы</a></div>');

    doc.on('click', '.openAuction', function(e){
      console.log('Открыть аукцион');
    });
  }
};
