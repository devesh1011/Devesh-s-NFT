async function main() {

    const [deployer] = await ethers.getSigners();

    const DeveshNFT = await ethers.getContractFactory("DeveshNFT");

    const hardhatDeveshNFT = await DeveshNFT.deploy();
    console.log("DeveshNFT deployed to:", hardhatDeveshNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    }
    );