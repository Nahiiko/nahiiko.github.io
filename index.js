if (window.web3) { //if Metamask injected some web3 code
  // Then replace the old injected version by the latest build of Web3.js version 1.0.0
  window.web3 = new Web3(window.web3.currentProvider);
}

async function startSign(){
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

document.addEventListener("DOMContentLoaded",function(event) { //on page load
    document.getElementById("message").focus();
    ethereum.request({ method: 'eth_requestAccounts' });
    fileupload.addEventListener('change',  updateAvatar);
    
});

async function updateAvatar(e){
    avatar.style.backgroundImage= "url('"+await toBase64(fileupload.files[0])+"')";
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});