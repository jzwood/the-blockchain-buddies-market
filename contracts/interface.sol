pragma solidity ^0.4.17;

interface NFCB {
  function mint(bytes16 _name, uint256 _price) external payable;

  function buy(uint8 _key) external;

  function ownerOf(uint8 _key) external view returns(address _owner);

  function modify(uint8 _key, bool _forSale, uint256 _price) external;
}
