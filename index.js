if (window.web3) {
  // Then replace the old injected version by the latest build of Web3.js version 1.0.0
  window.web3 = new Web3(window.web3.currentProvider);
}

function startSign(){
    var msgHash=document.getElementById("message").value;
    web3.eth.getAccounts()
    .then(function(accounts){
        var from = accounts[0];
        console.log(from);
        web3.eth.personal.sign(msgHash, from) //asking the user to sign in order to verify his identity
        .then((value) => {
        signature=value;
        console.log(signature); //log the signature to verify consistency with the signature the server gets (only dev)
        });
    });
}
