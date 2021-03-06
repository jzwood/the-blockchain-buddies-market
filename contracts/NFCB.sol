pragma solidity ^0.4.17;

contract NFCB {
  uint8 public numKeys = 0;
  uint8 private constant maxTokens = 255;

  address private CEO;

  mapping(uint8 => Token) public tokenMap;
  address[] private keyToOwner;

  struct Token {
    bytes16 name;
    uint256 price; // in Wei
    bool available;
  }

  constructor() public {
    CEO = msg.sender;
  }

  event NewBuddy(bytes16 name, uint256 price);
  event BuddyModified(uint8 key, address owner, uint256  price);

  function mint(bytes16 _name, uint256 _price) public {
    address minter = msg.sender;
    require(minter == CEO && numKeys < maxTokens);
    Token memory newToken = Token(_name, _price, true);
    uint8 key = numKeys++;
    tokenMap[key] = newToken;
    keyToOwner.push(CEO);
    emit NewBuddy(_name, _price);
  }

  function buy(uint8 _key) payable external {
    require(_key >= 0 && _key < numKeys);
    uint256 payment = msg.value;
    Token memory token = tokenMap[_key];
    require(token.available && token.price <= payment);
    address owner = keyToOwner[_key];
    require(msg.sender != owner);
    owner.transfer(token.price);
    keyToOwner[_key] = msg.sender;
    emit BuddyModified(_key, msg.sender, token.price);
  }

  function ownerOf(uint8 _key) public view returns(address _owner) {
    _owner = keyToOwner[_key];
  }

  function modify(uint8 _key, bool _forSale, uint256 _price) external {
    address owner = ownerOf(_key);
    require(owner == msg.sender);
    Token storage ownedToken = tokenMap[_key];
    ownedToken.price = _price;
    ownedToken.available = _forSale;
    emit BuddyModified(_key, owner, ownedToken.price);
  }
}
