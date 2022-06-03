pragma solidity ^0.8.7;

contract Product{
    string public product_name;
    uint public amount;
    string public img;
    address public owner;
    uint public value;
    address public buyer;
    constructor()payable{
        owner=payable(msg.sender);
    }
    event TransferOwnerShip(address _from,address _to,uint cost);
    event ProductUpload(string amount,string img,uint cost);
    modifier onlyCustomers{
        require(msg.sender != owner);
        _;
    }
    function uploadProduct(string memory _name, uint _amount, string memory _img1) public returns(bool success){
        require(msg.sender==owner);
        product_name = _name;
        amount=_amount;
        img=_img1;
        emit ProductUpload(product_name,img,amount);
        return true;
    }
    function TransferInitialization(uint cost) onlyCustomers public payable returns (address){
        require(cost>=amount, "Owner can't initiate self-transfer");
        buyer= msg.sender;
        Change_Owner(buyer,cost);
        return owner;
    }
    function Transfer(address payable _owner,address _buyer,uint _value) private returns (bool success){
            _owner.transfer(_value);
            emit TransferOwnerShip(_owner,_buyer,_value);
            return true;
    }
    function Change_Owner(address _buyer,uint _value) private{
        Transfer(payable(owner),_buyer,_value);
        owner=_buyer;
    }
}