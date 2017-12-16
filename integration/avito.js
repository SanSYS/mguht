// window.integrate = integrate;

integrate();

function integrate() {
  let repo   = 'https://localhost:443/mguht/';
  let rpcURL = 'https://localhost:443/eth'; // 'http://5.178.85.201:8545'; // 'https://localhost:443/eth';
  let apiUrl = 'https://2558d94c.ngrok.io';

  init();

  function init() {
    console.log(1);

      var doc = $(document.body);

      console.dir(Web3);

      var provider = new Web3.providers.HttpProvider(rpcURL);
      var web3     = new Web3(provider);
      window.web3 = web3;

      console.log(web3);

    var style = {
      btn: 'background: rgb(252, 194, 38);display: inline-block;font-size: 16px;padding: 0px 11px;line-height: 25px;border-radius: 4px;cursor:pointer',
      blueButtonClasses: 'header-button-add-item-2cgWl button-root-1U-0K button-root_size-m-3mjxJ button-root_design-primary-eZ5Gi'
    };

    var price = document.querySelector('.title-info-title-text');

    price.innerHTML += '<span id="sysByEth" style="'+style.btn+'">Купить за ETH1</span>';


    doc.on('click', '#sysByEth', function(e){
      var btn = e.target;

      console.log('эфир');

      let accounts = ["0x09374b1c383f75be7cb0c7693c0cad7ff93a3ef8", "0xdcaa18564716478c6a4bb2b05b85a95de106781a"];
      let password = '1';

      function transaction(from, to, amount) {
        let tx = {
          amount,
          from,
          to,
          pass: password
        };

        // https://cbe97c02.ngrok.io/Auction/send
        $.post(apiUrl + 'Auction/send', tx).then(r => console.dir(r))

      }
      // {"amount":1, "from":"0x09374b1c383f75be7cb0c7693c0cad7ff93a3ef8", "to":"0x9E592A53506e0711F462406729Ce59164D911F06", "pass":"1"}

      var coinbase = web3.eth.coinbase;
      var balance = web3.eth.getBalance(coinbase);
      // var accounts = web3.eth.accounts;

      console.dir(coinbase);
      console.dir(balance);
      console.dir(web3.eth.accounts);

      let tx = {
        from: web3.eth.accounts[0], // '0xdCAA18564716478C6a4Bb2b05B85A95dE106781A',
        to: web3.eth.accounts[1], // '0x09374B1c383f75be7Cb0C7693C0cAD7FF93A3Ef8',
        value: web3.toWei('0.1', 'ether')
      }
      // web3.eth.personal.unlockAccount('0xdCAA18564716478C6a4Bb2b05B85A95dE106781A', '1')
      web3.eth.sendTransaction(tx);

      console.log(btn, 'Дёргай етериум');
    });

    var self = $('.header-button-wrapper-iwCvN');

    self.after('<div class="header-button-wrapper-iwCvN openAuction" style="margin-right:12px;background:#f00"><a href="javascript:void(0)" class="' + style.blueButtonClasses + '" style="background:#f00">Аукционы</a></div>');

    doc.on('click', '.openAuction', function(e){
      console.log('Открыть аукцион');
    });
  }
};
