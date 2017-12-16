// ==UserScript==
// @name         Avito integration
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.avito.ru/moskva/telefony/telefon_ayfon_6_s_plyus_128_pamyat_1219971851
// @grant        none
// ==/UserScript==

(function() {
  'use strict';
  //  $(function(){
  //  $(document.body).append('<script src="https://localhost:443/mguht/integration/avito.js"></script>');
  // $(document.body).append('<script src="https://localhost:443/mguht/js/web3.js" onload="integrate()"></script>');
  //  });


  $(function() {
    importScript('https://localhost:443/mguht/js/web3.js', function() {
      importScript('https://localhost:443/mguht/integration/avito.js');
    });
  });


  function importScript(sSrc, fOnload) {
    var oScript = document.createElement("script");
    oScript.type = "text\/javascript";
    oScript.onerror = loadError;
    if (fOnload) {oScript.onload = fOnload;}
    document.body.parentNode.insertBefore(oScript, document.body);
    oScript.src = sSrc;
  }

  function loadError(oError) {
    throw new URIError("The script " + oError.target.src + " is not accessible.");
  }
})();
