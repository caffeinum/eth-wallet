var provider = new Web3.providers.HttpProvider("https://rinkeby.infura.io/sF8QaFr5COSzwukN3V2Y")
var web3 = new Web3(provider)

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

