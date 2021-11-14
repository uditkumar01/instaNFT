// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.2;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";
// import 'base64-sol/base64.sol';

// contract InstanftTrophy is ERC721, ERC721URIStorage, Ownable {
//     address public admin;
//     event Mint(address indexed _to, uint256 indexed _tokenId, uint8 _trophyId);

//     using Counters for Counters.Counter;

//     Counters.Counter private _tokenIdCounter;
//     Counters.Counter private _signupsCounter;
    
//     // mapping from tokenId to trophyId
//     mapping (uint256 => uint8) public trophyManager;
    
//     struct trophyDetails{
//         string name;
//         string url;
//     }
    
//     //mapping from trophyId to trophyimage URL
//     mapping (uint8 => trophyDetails) private trophyData;
    

//     constructor() ERC721("instanftTrophy", "INT") {
//         admin = msg.sender;
        
//         trophyData[1].name = "First 100 Signups";
//         trophyData[1].url = "https://gateway.pinata.cloud/ipfs/QmPfJZqnasPEn2JzUzUpqrednNZxvpMzsCJLJsW85rj655/top-100-signups.png";
        
//         trophyData[2].name = "100 NFTs Collected";
//         trophyData[2].url = "https://gateway.pinata.cloud/ipfs/QmPfJZqnasPEn2JzUzUpqrednNZxvpMzsCJLJsW85rj655/100-nft.png";
        
//         trophyData[3].name = "1000 follower";
//         trophyData[3].url = "https://gateway.pinata.cloud/ipfs/QmPfJZqnasPEn2JzUzUpqrednNZxvpMzsCJLJsW85rj655/1k-followers.png";
//     }
    
//     modifier onlyAdmin(){
//         require(msg.sender == admin);
//         _;
//     }
    
//     // admin function to update trophydata
//     function updateTrophyData(uint8 trophyId, string memory url) onlyAdmin public returns(bool){
//         trophyData[trophyId].url = url;
//         return true;
//     }

//     function mintTrophy(uint8 trophyId) public returns (uint256){
        
//         if(trophyId == 1){
//             require(_signupsCounter.current() < 100);
//             _signupsCounter.increment();
//         }
        
//         _tokenIdCounter.increment();
        
//         uint256 _id = _tokenIdCounter.current();
//         _safeMint(msg.sender, _id);
//         trophyManager[_id] = trophyId;
//         //emit event
//         emit Mint(msg.sender, _id, trophyId);
//         return _id;
//     }
    
//     // The following functions are overrides required by Solidity.

//     function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
//         super._burn(tokenId);
//     }

//     function tokenURI(uint256 tokenId)
//         public
//         view
//         override(ERC721, ERC721URIStorage)
//         returns (string memory)
//     {
//         uint8 trophyId = trophyManager[tokenId];
//         string memory trophyURL = trophyData[trophyId].url;
//         string memory trophyName = trophyData[trophyId].name;
        
//         string memory json = Base64.encode(bytes(string(abi.encodePacked('{"name":"', trophyName, '", "description": "Gamified NFT rewarded by instaNFT", "external_link":"https://insta-nft.vercel.app", "image":"', trophyURL, '"}'))));
//         string memory output = string(abi.encodePacked('data:application/json;base64,', json));
//         return output;
//     }
    
//     function toString(uint256 value) internal pure returns (string memory) {
//     // Inspired by OraclizeAPI's implementation - MIT license
//     // https://github.com/oraclize/ethereum-api/blob/b42146b063c7d6ee1358846c198246239e9360e8/oraclizeAPI_0.4.25.sol

//         if (value == 0) {
//             return "0";
//         }
//         uint256 temp = value;
//         uint256 digits;
//         while (temp != 0) {
//             digits++;
//             temp /= 10;
//         }
//         bytes memory buffer = new bytes(digits);
//         while (value != 0) {
//             digits -= 1;
//             buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
//             value /= 10;
//         }
//         return string(buffer);
//     }
// }