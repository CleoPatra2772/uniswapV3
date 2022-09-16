const { AlphaRouter } = require('@uniswap/smart-order-router')
const { Token, CurrencyAmount, TradeType, Percent } = require('@uniswap/sdk-core')
const { ethers, BigNumber } = require('ethers')
const JSBI = require('jsbi')
const ERC20ABI = require('./abi.json')

const V3_SWAP_ROUTER_ADDRESS = '0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45'
const INFURA_URL_TESTNET = process.env.REACT_APP_INFURA_URL_TESTNET