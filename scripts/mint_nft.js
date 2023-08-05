require('dotenv').config('./.env');

const PUBLIC_KEY = process.env.PUBLIC_KEY;
const PRIVATE_KEY = process.env.SEPOLIA_PRIVATE_KEY;
const API_URI = process.env.API_URI;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URI);

const contract = require('../artifacts/contracts/DeveshNFT.sol/DeveshNFT.json');

const contractAddress = "0x5d5Cb51b677300947E110E6073a7c61459ff0485";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

// create a function to mint NFTs
async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, 'latest'); //get latest nonce

    const tx = {
        "from": PUBLIC_KEY,
        "to": contractAddress,
        "nonce": nonce,
        "gas": 500000,
        "data": nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI()
    };

    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY);

    signPromise
        .then((signedTx) => {
            web3.eth.sendSignedTransaction(
                signedTx.rawTransaction,
                function (err, hash) {
                    if (!err) {
                        console.log(
                            "The hash of your transaction is: ",
                            hash,
                            "\nCheck Alchemy's Mempool to view the status of your transaction!"
                        );
                    } else {
                        console.log(
                            "Something went wrong when submitting your transaction:",
                            err
                        );
                    }
                }
            );
        })
        .catch((err) => {
            console.log("Promise failed:", err);
        });
}

mintNFT("https://gateway.pinata.cloud/ipfs/QmWXuggMzritkyeywXbArd2NRzzvyxrRAnPZ4maPYycnB7?_gl=1*pt06bl*_ga*MTAyMDcyNzQwMS4xNjkxMTU5NzM2*_ga_5RMPXG14TE*MTY5MTE1OTczNS4xLjEuMTY5MTE2MDc4MC42MC4wLjA.");
