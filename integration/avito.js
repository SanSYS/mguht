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

      window.cb = (e, r) => {
        console.log('e', JSON.stringify(e));
        console.log('r', JSON.stringify(r));
      }

      console.log(web3);

      var style = {
        btn: 'background: rgb(252, 194, 38);display: inline-block;font-size: 16px;padding: 0px 11px;line-height: 25px;border-radius: 4px;cursor:pointer',
        blueButtonClasses: 'header-button-add-item-2cgWl button-root-1U-0K button-root_size-m-3mjxJ button-root_design-primary-eZ5Gi',
        iframe: 'opacity:0.1;position: absolute;width: 0%;height: 100%;z-index: 1000;background: #fff;right: 0;box-shadow: -10px 0 26px rgba(0,0,0,0.5);',
        iframeCloseButton: 'opacity:0.1;position: absolute;right: 0%;height: 56px;z-index: 99999999999999;background: #343a40;color: #FFF;padding-left: 12px;line-height: 55px;font-size: 24px;font-weight: bold;cursor: pointer;padding-right: 12px;'
    };

    var price = document.querySelector('.title-info-title-text');

    price.innerHTML += '<span id="sysByEth" style="'+style.btn+'">Купить за ETH1</span>';


    doc.on('click', '#sysByEth', function(e){
      var btn = $(e.target);
      var oldBg = btn.css('background');
      btn
          .css('background', '#777')
          .text('Ожидание...');

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

        return api('Auction/send', tx);
      }
      // transaction(accounts[0], accounts[1], web3.toWei('0.1', 'ether'));
      // {"amount":1, "from":"0x09374b1c383f75be7cb0c7693c0cad7ff93a3ef8", "to":"0x9E592A53506e0711F462406729Ce59164D911F06", "pass":"1"}

      // var coinbase = web3.eth.coinbase;
      // var balance = web3.eth.getBalance(coinbase);
      // var accounts = web3.eth.accounts;

      // console.dir(coinbase);
      // console.dir(balance);
      console.dir(web3.eth.accounts);

      let tx = {
        from: web3.eth.accounts[0], // '0xdCAA18564716478C6a4Bb2b05B85A95dE106781A',
        to: web3.eth.accounts[1], // '0x09374B1c383f75be7Cb0C7693C0cAD7FF93A3Ef8',
        value: web3.toWei('0.1', 'ether')
      };

      /*
      {
          amount: "0.1",
          from: '0x09374b1c383f75be7cb0c7693c0cad7ff93a3ef8',
          to: '0xdcaa18564716478c6a4bb2b05b85a95de106781a',
          pass: '1'
        }
      */

      // web3.eth.personal.unlockAccount('0xdCAA18564716478C6a4Bb2b05B85A95dE106781A', '1')
      web3.eth.sendTransaction(tx, (e, r) => {
        btn
          .css('background', 'rgb(167, 221, 119)')
          .text('Успешно');
      });

      transaction(tx.from, tx.to, 0.1)
        .then(c => console.dir(c));

      initContract(tx.from)
        .then(contract => {
          console.log(contract);

        });

      // console.log(btn, 'Дёргай етериум');
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
        doc.append('<iframe id="auctionIframe" src="' + apiUrl + '/index.html?q=' + +new Date() + '#lot" style="' + style.iframe + '"></iframe>');
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

    function initContract(from) {
      return new Promise(function(resolve, reject) {
      var byteCode ='6060604052341561000f57600080fd5b60405161032338038061032383398101604052808051820191905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060019080519060200190610081929190610088565b505061012d565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100c957805160ff19168380011785556100f7565b828001600101855582156100f7579182015b828111156100f65782518255916020019190600101906100db565b5b5090506101049190610108565b5090565b61012a91905b8082111561012657600081600090555060010161010e565b5090565b90565b6101e78061013c6000396000f300606060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680639f28e48414610046575b600080fd5b341561005157600080fd5b6100a1600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506100a3565b005b806040518082805190602001908083835b6020831015156100d957805182526020820191506020810190506020830392506100b4565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902060001916600160405180828054600181600116156101000203166002900480156101675780601f10610145576101008083540402835291820191610167565b820191906000526020600020905b815481529060010190602001808311610153575b505091505060405180910390206000191614156101b8576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b505600a165627a7a723058207088713676ab3f5170b7740e970e0e1de925c2b30b9474dd4ea7ac6cb8a765660029';
      var abiDefinition = [
        {
          constant: false,
          inputs: [ [Object] ],
          name: 'Confirm',
          outputs: [],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'function'
        },
        {
          inputs: [ [Object] ],
          payable: false,
          stateMutability: 'nonpayable',
          type: 'constructor'
        }
      ];
      var orderContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"num","type":"string"}],"name":"Confirm","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[{"name":"num","type":"string"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}]);
      var order = orderContract.new(
        '12313',
        {
          from,
          data: '0x6060604052341561000f57600080fd5b60405161032338038061032383398101604052808051820191905050336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508060019080519060200190610081929190610088565b505061012d565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100c957805160ff19168380011785556100f7565b828001600101855582156100f7579182015b828111156100f65782518255916020019190600101906100db565b5b5090506101049190610108565b5090565b61012a91905b8082111561012657600081600090555060010161010e565b5090565b90565b6101e78061013c6000396000f300606060405260043610610041576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680639f28e48414610046575b600080fd5b341561005157600080fd5b6100a1600480803590602001908201803590602001908080601f016020809104026020016040519081016040528093929190818152602001838380828437820191505050505050919050506100a3565b005b806040518082805190602001908083835b6020831015156100d957805182526020820191506020810190506020830392506100b4565b6001836020036101000a038019825116818451168082178552505050505050905001915050604051809103902060001916600160405180828054600181600116156101000203166002900480156101675780601f10610145576101008083540402835291820191610167565b820191906000526020600020905b815481529060010190602001808311610153575b505091505060405180910390206000191614156101b8576000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16ff5b505600a165627a7a7230582097980eb968ba25e2c98c9b15f56a2cbdaeb8a739d71a3e2fd47cd590c4ef257c0029',
          gas: '4700000'
        }, function (e, contract){
          // console.log(e, contract);
          if (typeof contract.address !== 'undefined') {
              console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
              resolve(contract);
          }
        })
      });
    }

    function api(path, data) {
      return new Promise(function(resolve, reject) {
        $.ajax({
          url : apiUrl + '/' + path,
          data,
          type: "POST",
          success: r => {
            console.log('api request result');
            console.dir(r);
            resolve(r);
          },
          dataType: "application/json"
        });
      });
    }
  }
};
