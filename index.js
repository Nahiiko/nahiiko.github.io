if (window.web3) { //if Metamask injected some web3 code
  // Then replace the old injected version by the latest build of Web3.js version 1.0.0
  window.web3 = new Web3(window.web3.currentProvider);
}

async function startSign(){
    await window.ethereum.enable(); //give the code access to your ETH address
    var msgHash=document.getElementById("message").value; //get text in textbox
    web3.eth.getAccounts() //get user accounts 
    .then(function(accounts){
        var from = accounts[0]; //get the first ETH account
        console.log(from); //Log it
        web3.eth.personal.sign(msgHash, from) //asking the user to sign in order to verify his identity
        .then((value) => {
        signature=value;
        window.alert(signature);
        console.log(signature); //log the signature to verify consistency with the signature the server gets (only dev)
        });
    });
}
