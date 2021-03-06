# UniswapV3 Swap Event Detection

## Description

This agent detects Swap transactions for the UniswapV3 protocol

## Supported Chains

- Ethereum

## Alerts

Describe each of the type of alerts fired by this agent

- UNIV3-SWAP-EVENT
  - Fired when a transaction contains a Swap from UniswapV3
  - Severity is always set to "info" 
  - Type is always set to "info"
  - Metadata
    - `sender`: The address for the sender of the the swap.
    - `recipient`:  The address for the recipient of the the swap.
    - `amount0`: The quantitiy of token0 swapped.
    - `amount1`: The quantitiy of token1 swapped.
    - `tokenPoolAddress`: The token pool contract address.

  
## Test Data

The agent behaviour can be verified with the following transactions:

- tx: 0xae7f40606d10d91c7c44c8a968820d257ddc2a70c796cd4f765e9a547fc3dfc8
  - Token Pool Contract: 0x93c212b82c41dc99ba8ff5b21e03946da567ae6f
