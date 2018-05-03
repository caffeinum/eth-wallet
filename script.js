var provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/sF8QaFr5COSzwukN3V2Y")

var web3 = new Web3(provider)

var ETHERSCANBASE="https://rinkeby.etherscan.io/address/"

console.log(web3.version)
let priv = "0xd63264601ef2d420fe05decf1e3f7756b2826d69c33d16b7dd1fb5b0d79fe91d"  

var wallet = {
   account: null,
   balance: null,
   init: function (priv) {
      this.account = web3.eth.accounts.wallet.add(priv)
      this.getBalance()
   },
   getBalance: function () {
      let req = web3.eth.getBalance(this.account.address)
      req.then( (balance) => this.balance = balance )
      return req
   },
   deposit: function () {
      alert(this.account.address)
   },
   withdraw: function (dest, value) {
      dest = dest || window.prompt("Send to:")
      value = value || 1e18

      let transaction = web3.eth.sendTransaction({
         from: this.account.address,
         to: dest,
         value: value, //this.balance - 1e10,
         gas: 1e5 
      })

      console.log( transaction )
      if ( transaction ) {
         this.balance -= value
         updateBalance( this.balance )
      }
   }
}

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
