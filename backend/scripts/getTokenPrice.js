require("dotenv").config();
const { ethers, Contract } = require('ethers');
const DepositorABI = require("../../contracts/abi/Depositor.json");
const MainRouterABI = require("../../contracts/abi/MainRouter.json");
const NetworkInfomation = require("../src/NetworkInfomation.json");
const {
    currentChainID,
    getWallet,
    getCurrentChainId,
} = require("./helper")


async function getTokenPrice(tokenSymbol) {
    const avalancheFujiChainId = 43113;
    const wallet = getWallet(avalancheFujiChainId);

    const MAIN_ROUTER_ADDRESS = NetworkInfomation[avalancheFujiChainId].MAIN_ROUTER_ADDRESS;
    const mainRouterContract = new Contract(MAIN_ROUTER_ADDRESS, MainRouterABI, wallet);
    const tokenAddress = NetworkInfomation[avalancheFujiChainId]["TOKEN"][tokenSymbol].address;

    const priceFeedsInUsd = await mainRouterContract.getTokenPrice(tokenAddress);
    const priceFeedsInUsdFormat = ethers.utils.formatUnits(priceFeedsInUsd, 8);
    console.log(`Price of token ${tokenSymbol}: ${priceFeedsInUsdFormat}`);
    return priceFeedsInUsdFormat;
}

async function main() {
    getTokenPrice("UNI");
}

// main();

module.exports = {
    getTokenPrice,
}