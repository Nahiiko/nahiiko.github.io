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
        .then(async (value) => {
        signature=value;
        //window.alert(signature);
        console.log(signature); //log the signature to verify consistency with the signature the server gets (only dev)
            
        let data=await web3.eth.abi.encodeFunctionCall({name:'tokenURI',type: 'function',inputs: [{type: 'uint256',name: 'tokenId'}]},['24240']);
       console.log("encoded function:",data);
        let minted = await web3.eth.call({'from':'0xcd9Cbd0Efe4d94DE28eC47D27F72FeC43cA422F3','to':'0x60f80121c31a0d46b5279700f9df786054aa5ee5','data':data});
        console.log("minting done",web3.utils.hexToUtf8(minted));
        
        });
    });
}

document.addEventListener("DOMContentLoaded",async function(event) { //on page load
    document.getElementById("message").focus();
    fileupload.addEventListener('change',  updateAvatar);
    if(localStorage.getItem('avatar')!=null){avatar.style.backgroundImage=localStorage.getItem('avatar');} 
    await ethereum.request({ method: 'eth_requestAccounts' });
     web3.eth.getAccounts() //get user accounts 
    .then(function(accounts){ address.innerHTML='from: '+accounts[0];});
});

async function updateAvatar(e){
    let userAvatar=await toBase64(fileupload.files[0]);
    avatar.style.backgroundImage= "url('"+userAvatar+"')";
    localStorage.setItem('avatar', "url('"+userAvatar+"')");
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});