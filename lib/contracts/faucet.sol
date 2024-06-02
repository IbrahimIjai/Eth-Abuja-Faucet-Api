// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract EthAbujaFaucet {
    using SafeERC20 for IERC20;
    IERC20 public immutable USDT;
    IERC20 public immutable USDC;

    uint256 faucetAmount = 50 * 10**18;
    uint256 public constant minimumBalance = 1 * 10**18;
    uint256 public constant claimInterval = 1 hours;

    struct faucetRecords {
        uint256 blockTimeOfLastClaim;
    }

    mapping(address => faucetRecords) public faucetReords;

    constructor(address _usdt, address _usdc) {
        USDT = IERC20(_usdt);
        USDC = IERC20(_usdc);
    }

    function dripTokens(address testerAddress) public {
        //assuming usdt and usdc are always the same
        _sendFaucet(testerAddress);
    }

    // get fns
    function isTesterEligible(address testerAddress)
        public
        view
        returns (bool isEligible)
    {
        uint256 lastClaimTime = faucetReords[testerAddress]
            .blockTimeOfLastClaim;
        bool timeCondition = block.timestamp >= lastClaimTime + claimInterval;
        bool balanceCondition = USDC.balanceOf(testerAddress) <
            minimumBalance &&
            USDT.balanceOf(testerAddress) < minimumBalance;

        return timeCondition && balanceCondition;
    }

    // internal fn
    function _sendFaucet(address testerAddress)
        internal
        faucetChecks(testerAddress)
    {
        USDC.safeTransfer(testerAddress, faucetAmount);
        USDT.safeTransfer(testerAddress, faucetAmount);
        faucetReords[testerAddress].blockTimeOfLastClaim = block.timestamp;
    }

    modifier faucetChecks(address testerAddress) {
        require(
            block.timestamp >=
                faucetReords[testerAddress].blockTimeOfLastClaim +
                    claimInterval,
            "Claim not allowed multiple times within an hour"
        );
        require(
            USDC.balanceOf(testerAddress) < minimumBalance,
            "You have enough balance to Test"
        );
        require(
            USDT.balanceOf(testerAddress) < minimumBalance,
            "You have enough balance to Test"
        );

        uint256 usdtBalance = USDT.balanceOf(address(this));
        uint256 usdcBalance = USDC.balanceOf(address(this));
        require(usdcBalance >= faucetAmount, "Insufficient faucet balance");
        require(usdtBalance >= faucetAmount, "Insufficient faucet balance");
        _;
    }
}
