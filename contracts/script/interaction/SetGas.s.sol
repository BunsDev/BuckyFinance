// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import { Script } from "forge-std/Script.sol";
import { TokenConfig } from "../config/TokenConfig.s.sol";
import { ERC20Mock } from "../Mocks/ERC20Mock.sol";
import { Depositor } from "../../src/Depositor.sol";
import { ChainConfig } from "../config/ChainConfig.s.sol";
import { Parameters } from "../Parameters.sol";

contract SetGas is Script, Parameters {
    function run() external {
        ChainConfig config = new ChainConfig();
        ChainConfig.ChainComponent memory chain = config.run();

        vm.startBroadcast();
        Depositor(payable(chain.depositor)).setCCIPDepositAndMintGasLimit{gas: 5000000}(1_500_000);
        vm.stopBroadcast();
    }
}