contract Order {
    address owner;
    string checkNum;
    function Order(string num) { owner = msg.sender; checkNum = num; }
    function Confirm(string num) { if (keccak256(checkNum) == keccak256(num)) selfdestruct(owner); }
}
