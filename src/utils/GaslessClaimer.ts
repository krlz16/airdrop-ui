import {
  AIRDROP_MANAGER_ADDRESS,
  ARKA_PUBLIC_KEY,
  BUNDLER_API_KEY,
  CHAIN_ID,
  CUSTOM_BUNDLER_URL,
} from '@/constants'
import {
  EtherspotBundler,
  MetaMaskWalletProvider,
  PrimeSdk,
} from '@etherspot/prime-sdk'
import { ethers } from 'ethers'

import AirdropAdminAbi from './abi/AirdropManager.json'

export async function GaslessClaimer(
  customAirdropAddress: string,
  claimerAddress: string,
  amount: number = 0,
  proof: string[] = [
    '0x0000000000000000000000000000000000000000000000000000000000000000',
  ]
) {
  try {
    const metamaskProvider = await MetaMaskWalletProvider.connect()
    const bundlerApiKey = BUNDLER_API_KEY
    const customBundlerUrl = CUSTOM_BUNDLER_URL
    const chainId = Number(CHAIN_ID)
    const airdropManagerAddress = AIRDROP_MANAGER_ADDRESS
    const apiKey = ARKA_PUBLIC_KEY

    if (
      !metamaskProvider ||
      !bundlerApiKey ||
      !customBundlerUrl ||
      !chainId ||
      !airdropManagerAddress ||
      !apiKey
    ) {
      throw new Error('Missing data for GaslessClaimer execution')
    }
    const primeSdk = new PrimeSdk(metamaskProvider, {
      chainId: chainId,
      bundlerProvider: new EtherspotBundler(
        chainId,
        bundlerApiKey,
        customBundlerUrl
      ),
    })
    const airdropAdminContract = new ethers.Contract(
      airdropManagerAddress,
      AirdropAdminAbi.abi
    )
    const encodedData = airdropAdminContract.interface.encodeFunctionData(
      'claim',
      [customAirdropAddress, claimerAddress, amount, proof]
    )
    await primeSdk.addUserOpsToBatch({
      to: airdropManagerAddress,
      data: encodedData,
    })
    const op = await primeSdk.estimate({
      paymasterDetails: {
        url: `https://arka.etherspot.io?apiKey=${apiKey}&chainId=${chainId}`,
        context: { mode: 'sponsor' },
      },
    })
    const uoHash = await primeSdk.send(op)
    let userOpsReceipt = null
    const timeout = Date.now() + 120000 // 2 minutes timeout
    while (userOpsReceipt == null && Date.now() < timeout) {
      console.log('Waiting for transaction...')
      await wait(5000)
      userOpsReceipt = await primeSdk.getUserOpReceipt(uoHash)
    }
    console.log('\x1b[33m%s\x1b[0m', `Transaction Receipt: `, userOpsReceipt)
    return userOpsReceipt
  } catch (error) {
    console.log('error on tx is:', error)
    return null
  }
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
