pragma solidity ^0.4.17;

contract NFCB {
  uint8 private maxKey;
  uint8 private constant maxTokens = 255;

  address private CEO;

  mapping(uint8 => Token) public tokenMap;
  address[] private keyToOwner;

  struct Token {
    bytes16 name;
    uint256 price; //in wei
    bool available;
  }

  constructor() public {
    CEO = msg.sender;
    maxKey = 1;
    keyToOwner.push(address(0));
  }

  event NewCryptoBuddy(
    bytes16 name,
    uint256 price
  );

  function mint(bytes16 _name, uint256 _price) payable public {
    address minter = msg.sender;
    require(minter == CEO && maxKey < maxTokens);
    Token memory newToken = Token(_name, _price, true);
    uint8 key = ++maxKey;
    tokenMap[key] = newToken;
    keyToOwner.push(CEO);
    emit NewCryptoBuddy(_name, _price);
  }

  function buy(uint8 _key) payable external {
    require(_key > 0 && _key <= maxKey);
    uint256 payment = msg.value;
    Token memory token = tokenMap[_key];
    require(token.available && token.price <= payment);
    address owner = keyToOwner[_key];
    assert(owner != address(0));
    owner.transfer(token.price);
    keyToOwner[_key] = msg.sender;
  }

  function ownerOf(uint8 _key) public view returns(address _owner) {
    _owner = keyToOwner[_key];
  }

  function modify(uint8 _key, bool _forSale, uint8 _price) external {
    require(ownerOf(_key) == msg.sender);
    Token storage ownedToken = tokenMap[_key];
    ownedToken.price = _price;
    ownedToken.available = _forSale;
  }
}
