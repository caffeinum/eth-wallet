var ETHERSCANBASE="https://rinkeby.etherscan.io/address/"
let priv = "0xd63264601ef2d420fe05decf1e3f7756b2826d69c33d16b7dd1fb5b0d79fe91d"  

function updateBalance( newBalance ) {
  $('.balance').innerText = "" + (newBalance / 1e18) + " ETH     /      " + newBalance + " wei"
}

async function setup() {
  wallet.init(priv)

  $ = (selector) => document.querySelector(selector)

  $('.address').innerText = wallet.account.address
//  $('.address').onclick = () => wallet.deposit()
  $('.link-address').href = ETHERSCANBASE + wallet.account.address

  balance = await wallet.getBalance()
  updateBalance( balance )

  $('.link-deposit').onclick = () => wallet.deposit()
  $('.link-withdraw').onclick = () => wallet.withdraw() 
}

window.onload = setup;
