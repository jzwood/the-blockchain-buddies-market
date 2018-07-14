const NFCB = artifacts.require('./NFCB.sol')

module.exports = deployer => {
  deployer.deploy(NFCB)
}
