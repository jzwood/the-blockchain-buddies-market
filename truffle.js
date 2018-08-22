module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  networks: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    },
    development: {
      host: '127.0.0.1',
      port: 8545,
      gas: 6712388,
      gasPrice: 65000000000,
      network_id: '*', // Match any network id
      wsOrigins: 'http://127.0.0.1:1234'
    }
  }
}
